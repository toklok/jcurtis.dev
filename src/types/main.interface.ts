export interface ICollection {
  data: {
    collectionByHandle: {
      description: string;
      products: {
        edges: [
          {
            node: {
              id: string;
              description: string;
              images: {
                edges: [
                  {
                    node: {
                      original: string;
                      thumbnail: string;
                      retina: string;
                      altText: string | null;
                    };
                  }
                ];
              };
            };
          }
        ];
      };
    };
  };
}
