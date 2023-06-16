export interface PersonalityModel {
  Id: number;
  Personality: string;
  Incompatibile: number[];
}

export const Personalities: PersonalityModel[] = [
  {
    Id: 1,
    Personality: "Adventurous",
    Incompatibile: [6],
  },
  {
    Id: 2,
    Personality: "Cheerful",
    Incompatibile: [3],
  },
  {
    Id: 3,
    Personality: "Depressive",
    Incompatibile: [2],
  },
  {
    Id: 4,
    Personality: "Brave",
    Incompatibile: [5],
  },
  {
    Id: 5,
    Personality: "Cowardly",
    Incompatibile: [4],
  },
  {
    Id: 6,
    Personality: "Cautious",
    Incompatibile: [1],
  },
];

export default Personalities;
