export const FirstNames: { [key: string]: string[] } = {
  MALE: [
    "John",
    "Greg",
    "James",
    "Emmett",
    "Marty",
    "Doug",
    "Douglas",
    "Alexander",
    "Ryu",
  ],
  FEMALE: [
    "Brittany",
    "Alexandra",
    "Isabelle",
    "Jezabel",
    "Lucy",
    "Dixie",
    "Io",
    "Popo",
    "Amy",
  ],
  OTHER: ["Sam", "Riley", "Blake", "Quinns", "Remy", "Frankie", "Alex"],
};

export const Surnames: string[] = [
  "Smith",
  "Jones",
  "Williams",
  "Brown",
  "Wilson",
  "Taylor",
  "Johnson",
  "White",
  "Martin",
  "Anderson",
  "Thompson",
  "Nguyen",
  "Thomas",
  "Walker",
  "Harris",
  "Lee",
  "Ryan",
  "Baker",
  "Yagami",
  "Kasuga",
];

export const Nicknames: string[] = [
  "Blackbeard",
  "The Great",
  "Firestarter",
  "Firecracker",
  "Mad Lad",
  "Magnum",
];

const AllNames = {
  FirstNames,
  Surnames,
  Nicknames,
};

export default AllNames;
