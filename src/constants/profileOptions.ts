export const academicDegrees = [
  "Secondary Education",
  "Undergraduate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

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
];

export const knowledgeLevels = ["Beginner", "Intermediate", "Advanced"];

export const employeeExperienceLevels = ["Beginner", "Intermediate", "Advanced"];

export const positionMapping = {
  "Project Manager": 1,
  "Scrum Master": 2,
  "Product Owner": 3,
  "Developer": 4,
  "Technical Lead": 5,
  "Director": 6
};

export const idToPositionMapping = {
  1: "Project Manager",
  2: "Scrum Master",
  3: "Product Owner",
  4: "Developer",
  5: "Technical Lead",
  6: "Director"
};

// Organization Constants

export const organizationCategories = ['Finance', 'Health', 'Education', 'Technology', 'Retail', 'Manufacturing'];

export const organizationStates = ['ES', 'RJ', 'SP'];

export const organizationTypes = [
  'Software Factory',
  'Startup',
  'Private Company with an IT Department',
  'Single-product Software Company (e.g. Airbnb, Uber)'
];

export const organizationSizes = [
  '01 to 09 employees',
  '10 to 49 employees',
  '50 to 99 employees',
  'More than 99 employees'
];

export const stateMapping: Record<number, string> = {
  1: 'ES',
  2: 'RJ',
  3: 'SP'
};

export const typeMapping: Record<number, string> = {
  1: 'Software Factory',
  2: 'Startup',
  3: 'Private Company with an IT Department',
  4: 'Single-product Software Company (e.g. Airbnb, Uber)'
};

export const sizeMapping: Record<number, string> = {
  1: '01 to 09 employees',
  2: '10 to 49 employees',
  3: '50 to 99 employees',
  4: 'More than 99 employees'
};

export const categoryMapping: Record<number, string> = {
  1: 'Finance',
  2: 'Health',
  3: 'Education',
  4: 'Technology',
  5: 'Retail',
  6: 'Manufacturing'
};

