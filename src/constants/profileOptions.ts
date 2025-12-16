export const academicDegrees = [
  "Secondary Education",
  'Technical Education',
  "Undergraduate",
  'Specialization',
  "Master's Degree",
  "Doctorate",
];

export const academicDegreeMapping: Record<string, number> = {
  "Secondary Education": 1,
  "Technical Education": 2,
  "Undergraduate": 3,
  "Specialization": 4,
  "Master's Degree": 5,
  "Doctorate": 6,
};

export const idToAcademicDegreeMapping: Record<number, string> = {
  1: "Secondary Education",
  2: "Technical Education",
  3: "Undergraduate",
  4: "Specialization",
  5: "Master's Degree",
  6: "Doctorate",
};

export const academicDegreeStatuses = [
  { label: "In Progress", value: 1 },
  { label: "Completed", value: 2 },
];

export const experienceLevels = ["Junior", "Mid-level", "Senior"];

export const positionLevels = [
  "Project Manager",
  "Scrum Master",
  "Product Owner",
  "Developer",
  "Technical Lead",
  "Director",
  "Squad Intern",
  "Senior Manager",
  "Subject Matter Expert (SME) – Technical Lead – Project Manager – Scrum Master",
  "EBTT Professor",
  "TI Manager",
  "Software Engineering Coordinator",
];

export const knowledgeLevels = ["Beginner", "Intermediate", "Advanced"];

export const employeeExperienceLevels = ["Beginner", "Intermediate", "Advanced"];

export const employeeExperienceLevelMapping: Record<string, number> = {
  "Beginner": 1,
  "Intermediate": 2,
  "Advanced": 3,
};

export const idToEmployeeExperienceLevelMapping: Record<number, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

export const positionMapping = {
  "Project Manager": 1,
  "Scrum Master": 2,
  "Product Owner": 3,
  "Developer": 4,
  "Technical Lead": 5,
  "Director": 6,
  "Squad Intern": 7,
  "Senior Manager": 8,
  "Subject Matter Expert (SME) – Technical Lead – Project Manager – Scrum Master": 9,
  "EBTT Professor": 10,
  "TI Manager": 11,
  "Software Engineering Coordinator": 12,
};

export const idToPositionMapping = {
  1: "Project Manager",
  2: "Scrum Master",
  3: "Product Owner",
  4: "Developer",
  5: "Technical Lead",
  6: "Director",
  7: "Squad Intern",
  8: "Senior Manager",
  9: "Subject Matter Expert (SME) – Technical Lead – Project Manager – Scrum Master",
  10: "EBTT Professor",
  11: "TI Manager",
  12: "Software Engineering Coordinator",
};

// Organization Constants

export const organizationStates = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"];

export const organizationTypes = [
  'Software Factory',
  'Startup',
  'Private Company with an IT Department',
  'Public Company with an IT Department',
  'Company whose business is based on a single software product',
  'R&D Institute with multiple IT departments',
  'Federal Institute of Education',
  'Private Company focused on innovation and digital transformation (business agility)',
  'IT services and consulting company (infrastructure and application support, project development, etc.)',
  'IT services and consulting company (infrastructure and application support, project development, etc.)',
  'Public Foundation with an IT Department',
];

export const organizationSizes = [
  '01 to 09 employees',
  '10 to 49 employees',
  '50 to 99 employees',
  'More than 99 employees'
];

export const stateMapping: Record<number, string> = {
  1: 'Acre',
  2: 'Alagoas',
  3: 'Amapá',
  4: 'Amazonas',
  5: 'Bahia',
  6: 'Ceará',
  7: 'Distrito Federal',
  8: 'Espírito Santo',
  9: 'Goiás',
  10: 'Maranhão',
  11: 'Mato Grosso',
  12: 'Mato Grosso do Sul',
  13: 'Minas Gerais',
  14: 'Pará',
  15: 'Paraíba',
  16: 'Paraná',
  17: 'Pernambuco',
  18: 'Piauí',
  19: 'Rio de Janeiro',
  20: 'Rio Grande do Norte',
  21: 'Rio Grande do Sul',
  22: 'Rondônia',
  23: 'Roraima',
  24: 'Santa Catarina',
  25: 'São Paulo',
  26: 'Sergipe',
  27: 'Tocantins',
};

export const typeMapping: Record<number, string> = {
  1: 'Software Factory',
  2: 'Startup',
  3: 'Private Company with an IT Department',
  4: 'Public Company with an IT Department',
  5: 'Company whose business is based on a single software product',
  6: 'R&D Institute with multiple IT departments',
  7: 'Federal Institute of Education',
  8: 'Private Company focused on innovation and digital transformation (business agility)',
  9: 'IT services and consulting company (infrastructure and application support, project development, etc.)',
  10: 'IT services and consulting company (infrastructure and application support, project development, etc.)',
  11: 'Public Foundation with an IT Department',
};

export const sizeMapping: Record<number, string> = {
  1: '01 to 09 employees',
  2: '10 to 49 employees',
  3: '50 to 99 employees',
  4: 'More than 99 employees'
};
