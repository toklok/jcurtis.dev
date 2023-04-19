export function flattenConnection(connection: any): any[] {
    if (!connection) {
        throw new Error('flattenConnection(): Needs a connection');
    }
    if ('nodes' in connection) {
        return connection.nodes;
    }

    if ('edges' in connection && Array.isArray(connection.edges)) {
        const flattenedNodes: any[] = [];
        for (let i = 0; i < connection.edges.length; i++) {
            let edge = connection.edges[i];
            if (!edge || !edge.node) {
                throw new Error('flattenConnection(): Connection edges must contain nodes');
            }
            flattenedNodes.push(edge.node);
        }
        return flattenedNodes;
    }
    return [];
}