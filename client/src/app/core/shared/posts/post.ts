export class Post {
    title: string;
    description: string;
    private: boolean;
    id: number;
    likes: number;
    views: number;
    modified: Date;
    blocks: Block[] = [];
}
export class Block {
    id: number;
    blocks: Block[] = [];
    content: string = "Default";
    position: Position = new Position;
    size: Size = new Size;

    backgroundColor: string = "#ffffff";
    fontColor: string = "#000000";
    fontSize: number = 12;
    fontStyle: string = "normal";
    fontWeight: string = "normal";
    textDecoration: string = "none";
    textAlign:string = "center";
    borderRadius: string = "4";
}

export class Position {
    x: number = 0;
    y: number = 0;
}

export class Size {
    width: number = 200;
    height: number = 100;
}