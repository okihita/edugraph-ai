import { ConceptNode, PrerequisiteEdge, NodeStatus } from './types';

export function updateDKTState(
  nodes: ConceptNode[],
  edges: PrerequisiteEdge[],
  conceptId: string,
  isCorrect: boolean,
  deficitRootConceptId?: string
): { updatedNodes: ConceptNode[]; masteryDelta: number; message: string; backtrackedTo?: string } {
  let masteryDelta = 0;
  let backtrackedTo: string | undefined = undefined;

  const newNodes = nodes.map((node) => {
    if (node.id === conceptId) {
      const oldScore = node.masteryScore;
      let newScore = isCorrect
        ? Math.min(1.0, oldScore + 0.22)
        : Math.max(0.1, oldScore - 0.18);
      
      masteryDelta = newScore - oldScore;

      let newStatus: NodeStatus = node.status;
      if (newScore >= 0.80) newStatus = 'mastered';
      else if (newScore >= 0.50) newStatus = 'learning';
      else newStatus = 'deficit';

      return {
        ...node,
        masteryScore: Number(newScore.toFixed(2)),
        status: newStatus
      };
    }

    // If an explicit prerequisite deficit is flagged, update that ancestor node
    if (!isCorrect && deficitRootConceptId && node.id === deficitRootConceptId) {
      backtrackedTo = node.id;
      const penaltyScore = Math.max(0.15, node.masteryScore - 0.25);
      return {
        ...node,
        masteryScore: Number(penaltyScore.toFixed(2)),
        status: 'deficit' as NodeStatus
      };
    }

    return node;
  });

  // Check and unlock downstream nodes if all their prerequisites meet threshold (>= 0.70)
  const finalNodes = newNodes.map((node) => {
    if (node.status === 'locked' && node.prerequisites.length > 0) {
      const allPrereqsMastered = node.prerequisites.every((prereqId) => {
        const pNode = newNodes.find((n) => n.id === prereqId);
        return pNode && pNode.masteryScore >= 0.70;
      });

      if (allPrereqsMastered) {
        return {
          ...node,
          status: 'learning' as NodeStatus,
          masteryScore: 0.40
        };
      }
    }
    return node;
  });

  const message = isCorrect
    ? `Deep Knowledge Tracing Engine: Penguasaan konsep meningkat (+${(masteryDelta * 100).toFixed(0)}%).`
    : `Deep Knowledge Tracing Engine: Terdeteksi kesenjangan konsep (${(masteryDelta * 100).toFixed(0)}%).`;

  return {
    updatedNodes: finalNodes,
    masteryDelta,
    message,
    backtrackedTo
  };
}

export function tracePrerequisiteMisconceptions(
  nodes: ConceptNode[],
  edges: PrerequisiteEdge[],
  targetConceptId: string
): ConceptNode[] {
  const targetNode = nodes.find((n) => n.id === targetConceptId);
  if (!targetNode) return [];

  const prereqNodes: ConceptNode[] = [];
  const visited = new Set<string>();
  const queue = [...targetNode.prerequisites];

  while (queue.length > 0) {
    const currId = queue.shift()!;
    if (visited.has(currId)) continue;
    visited.add(currId);

    const currNode = nodes.find((n) => n.id === currId);
    if (currNode) {
      prereqNodes.push(currNode);
      queue.push(...currNode.prerequisites);
    }
  }

  // Sort by lowest mastery score (highest deficit first)
  return prereqNodes.sort((a, b) => a.masteryScore - b.masteryScore);
}
