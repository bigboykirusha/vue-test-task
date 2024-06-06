export interface Character {
   id: number;
   name: string;
   status: string;
   species: string;
   gender: string;
   location: Record<string, string>;
   origin: Record<string, string>;
   image: string;
}

export interface Info {
   count: number;
   pages: number;
   next: string | null;
   prev: string | null;
}

export interface CharacterResponse {
   info: Info;
   results: Character[];
}
