interface User {
  name: string;
  email: string;
  password: string;
  type: string;
  jobTitle: string;
  active: boolean;
  course: string;
  schedule: string;
  startDate: string;
  endDate: string;
}

export const users: User[] = [
  {
    name: 'Daniel Gonzalez',
    email: 'daniel@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Web Development',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2023-05-01',
    endDate: '2025-05-01'
  },
  {
    name: 'Rafael Massimo',
    email: 'rafael@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Web Development',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2023-05-01',
    endDate: '2025-05-01'
  },
  {
    name: 'Taiki Honda',
    email: 'taiki@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Web Development',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2023-05-01',
    endDate: '2025-05-01'
  },
  {
    name: 'Taisei Yamaguchi',
    email: 'taisei@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Web Development',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2023-05-01',
    endDate: '2025-05-01'
  },
  {
    name: 'Alex Lopez',
    email: 'alex456@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2022-02-21',
    endDate: '2025-02-24'
  },
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2022-03-15',
    endDate: '2024-03-14'
  },
  {
    name: 'Daniel Smith',
    email: 'daniel.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2022-05-10',
    endDate: '2024-05-09'
  },
  {
    name: 'Sophia Brown',
    email: 'sophia.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: true,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2022-06-18',
    endDate: '2025-06-17'
  },
  {
    name: 'William Taylor',
    email: 'william.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: false,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2022-08-25',
    endDate: '2024-08-24'
  },
  {
    name: 'Olivia Martinez',
    email: 'olivia.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2022-09-30',
    endDate: '2024-09-29'
  },
  {
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Analyst',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2022-11-05',
    endDate: '2025-11-04'
  },
  {
    name: 'Isabella Garcia',
    email: 'isabella.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'morning',
    startDate: '2023-01-12',
    endDate: '2025-01-11'
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Hospitality Manager',
    active: true,
    course: 'Hospitality',
    schedule: 'afternoon',
    startDate: '2023-02-17',
    endDate: '2025-02-16'
  },
  {
    name: 'Charlotte Rodriguez',
    email: 'charlotte.rodriguez@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2023-04-26',
    endDate: '2026-04-25'
  },
  {
    name: 'Benjamin Martinez',
    email: 'benjamin.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2023-06-03',
    endDate: '2025-06-02'
  },
  {
    name: 'Amelia Brown',
    email: 'amelia.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2023-07-09',
    endDate: '2025-07-08'
  },
  {
    name: 'Ethan Smith',
    email: 'ethan.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2023-08-15',
    endDate: '2026-08-14'
  },
  {
    name: 'Mia Johnson',
    email: 'mia.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2023-09-21',
    endDate: '2025-09-20'
  },
  {
    name: 'Noah Taylor',
    email: 'noah.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2023-10-28',
    endDate: '2025-10-27'
  },
  {
    name: 'Ava Martinez',
    email: 'ava.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Analyst',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2023-12-04',
    endDate: '2026-12-03'
  },
  {
    name: 'Liam Garcia',
    email: 'liam.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'morning',
    startDate: '2024-01-10',
    endDate: '2026-01-09'
  },
  {
    name: 'Emma Wilson',
    email: 'emma.wilson@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Hospitality Manager',
    active: true,
    course: 'Hospitality',
    schedule: 'afternoon',
    startDate: '2024-02-16',
    endDate: '2026-02-15'
  },
  {
    name: 'Daniel Rodriguez',
    email: 'daniel.rodriguez@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2024-03-24',
    endDate: '2027-03-23'
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2024-04-30',
    endDate: '2026-04-29'
  },
  {
    name: 'William Brown',
    email: 'william.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2024-06-06',
    endDate: '2026-06-05'
  },
  {
    name: 'Olivia Smith',
    email: 'olivia.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2024-07-13',
    endDate: '2027-07-12'
  },
  {
    name: 'Michael Johnson',
    email: 'michael.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2024-08-19',
    endDate: '2026-08-18'
  },
  {
    name: 'Isabella Taylor',
    email: 'isabella.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2024-09-25',
    endDate: '2026-09-24'
  },
  {
    name: 'James Garcia',
    email: 'james.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Analyst',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2024-10-31',
    endDate: '2027-10-30'
  },
  {
    name: 'Charlotte Martinez',
    email: 'charlotte.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'morning',
    startDate: '2024-12-06',
    endDate: '2026-12-05'
  },
  {
    name: 'Benjamin Brown',
    email: 'benjamin.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Hospitality Manager',
    active: true,
    course: 'Hospitality',
    schedule: 'afternoon',
    startDate: '2025-01-12',
    endDate: '2027-01-11'
  },
  {
    name: 'Amelia Smith',
    email: 'amelia.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2025-02-18',
    endDate: '2028-02-17'
  },
  {
    name: 'Ethan Johnson',
    email: 'ethan.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2025-03-26',
    endDate: '2027-03-25'
  },
  {
    name: 'Mia Taylor',
    email: 'mia.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2025-05-01',
    endDate: '2027-04-30'
  },
  {
    name: 'Noah Garcia',
    email: 'noah.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2025-06-07',
    endDate: '2028-06-06'
  },
  {
    name: 'Alejandra Martinez',
    email: 'ale.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2025-07-13',
    endDate: '2027-07-12'
  },
  {
    name: 'Liam Brown',
    email: 'liam.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2025-08-19',
    endDate: '2027-08-18'
  },
  {
    name: 'Emma Smith',
    email: 'emma.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Analyst',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2025-09-25',
    endDate: '2028-09-24'
  },
  {
    name: 'Daniel Johnson',
    email: 'daniel.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'morning',
    startDate: '2025-10-31',
    endDate: '2027-10-30'
  },
  {
    name: 'Sophia Taylor',
    email: 'sophia.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Hospitality Manager',
    active: true,
    course: 'Hospitality',
    schedule: 'afternoon',
    startDate: '2025-12-06',
    endDate: '2027-12-05'
  },
  {
    name: 'Max Cowell',
    email: 'max.cowell@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Web Development',
    schedule: 'evening',
    startDate: '2026-01-12',
    endDate: '2029-01-11'
  },
  {
    name: 'Fernando de la Olla',
    email: 'fernando234@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2026-02-18',
    endDate: '2028-02-17'
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2026-03-26',
    endDate: '2028-03-25'
  },
  {
    name: 'Isabella Smith',
    email: 'isabella.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2026-05-01',
    endDate: '2029-04-30'
  },
  {
    name: 'James Johnson',
    email: 'james.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2026-06-07',
    endDate: '2028-06-06'
  },
  {
    name: 'Charlotte Taylor',
    email: 'charlotte.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2026-07-13',
    endDate: '2028-07-12'
  },
  {
    name: 'Benjamin Garcia',
    email: 'benjamin.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Analyst',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2026-08-19',
    endDate: '2029-08-18'
  },
  {
    name: 'Amelia Martinez',
    email: 'amelia.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'morning',
    startDate: '2026-09-25',
    endDate: '2028-09-24'
  },
  {
    name: 'Ethan Brown',
    email: 'ethan.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Hospitality Manager',
    active: true,
    course: 'Hospitality',
    schedule: 'afternoon',
    startDate: '2026-10-31',
    endDate: '2028-10-30'
  },
  {
    name: 'Mia Garcia',
    email: 'mia.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2026-12-06',
    endDate: '2029-12-05'
  },
  {
    name: 'Noah Martinez',
    email: 'noah.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2027-01-12',
    endDate: '2029-01-11'
  },
  {
    name: 'Ava Brown',
    email: 'ava.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2027-02-18',
    endDate: '2029-02-17'
  },
  {
    name: 'Liam Smith',
    email: 'liam.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2027-03-26',
    endDate: '2030-03-25'
  },
  {
    name: 'Emma Jale',
    email: 'emma234.jale@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2027-04-30',
    endDate: '2029-04-29'
  },
  {
    name: 'Daniel Taylor',
    email: 'daniel.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2027-06-06',
    endDate: '2029-06-05'
  },
  {
    name: 'Sophia Garcia',
    email: 'sophia.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2027-07-12',
    endDate: '2030-07-11'
  },
  {
    name: 'William Martinez',
    email: 'william.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2027-08-18',
    endDate: '2029-08-17'
  },
  {
    name: 'Olivia Brown',
    email: 'olivia.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2027-09-24',
    endDate: '2029-09-23'
  },
  {
    name: 'Michael Smith',
    email: 'michael.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2027-10-30',
    endDate: '2030-10-29'
  },
  {
    name: 'Isabella Johnson',
    email: 'isabella.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2027-12-06',
    endDate: '2029-12-05'
  },
  {
    name: 'James Taylor',
    email: 'james.taylor@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2028-01-12',
    endDate: '2030-01-11'
  },
  {
    name: 'Charlotte Garcia',
    email: 'charlotte.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2028-02-18',
    endDate: '2031-02-17'
  },
  {
    name: 'Arnold Martinez',
    email: 'arnold.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2028-03-25',
    endDate: '2030-03-24'
  },
  {
    name: 'Amelia Yule',
    email: 'amelia123@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2028-04-30',
    endDate: '2030-04-29'
  },
  {
    name: 'Ethan Louis',
    email: 'ethan123@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2028-06-06',
    endDate: '2031-06-05'
  },
  {
    name: 'Erika Johnston',
    email: 'erika123@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2028-07-12',
    endDate: '2030-07-11'
  },
  {
    name: 'Taylor Smith',
    email: 'tailor.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2028-08-19',
    endDate: '2030-08-18'
  },
  {
    name: 'Ava Garcia',
    email: 'ava.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2028-09-25',
    endDate: '2031-09-24'
  },
  {
    name: 'Liam Lee',
    email: 'liam123@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2028-10-31',
    endDate: '2030-10-30'
  },
  {
    name: 'Emma Brown',
    email: 'emma.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2028-12-06',
    endDate: '2030-12-05'
  },
  {
    name: 'Daniel Smith',
    email: 'daniel123@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2029-01-12',
    endDate: '2032-01-11'
  },
  {
    name: 'Sophia Johnson',
    email: 'sophia.johnson@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2029-02-18',
    endDate: '2031-02-17'
  },
  {
    name: 'William Olmos',
    email: 'william123@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'Web Development Engineer',
    active: true,
    course: 'Web Development',
    schedule: 'afternoon',
    startDate: '2029-03-25',
    endDate: '2031-03-24'
  },
  {
    name: 'Olivia Garcia',
    email: 'olivia.garcia@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Software Architect',
    active: false,
    course: 'Software Architect',
    schedule: 'evening',
    startDate: '2029-04-30',
    endDate: '2032-04-29'
  },
  {
    name: 'Michael Martinez',
    email: 'michael.martinez@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Web Development Specialist',
    active: true,
    course: 'Web Development',
    schedule: 'morning',
    startDate: '2029-06-06',
    endDate: '2031-06-05'
  },
  {
    name: 'Isabella Brown',
    email: 'isabella.brown@gmail.com',
    password: 'cornerstone2024',
    type: 'admin',
    jobTitle: 'UX / UI Designer',
    active: true,
    course: 'UX / UI Designer',
    schedule: 'afternoon',
    startDate: '2029-07-12',
    endDate: '2031-07-11'
  },
  {
    name: 'James Smith',
    email: 'james.smith@gmail.com',
    password: 'cornerstone2024',
    type: 'student',
    jobTitle: 'Digital Marketing Manager',
    active: false,
    course: 'Digital Marketing',
    schedule: 'evening',
    startDate: '2029-08-19',
    endDate: '2032-08-18'
  },
  {
    name: 'Charlotte Johnson',
    email: 'charlotte123@gmail.com',
    password: 'cornerstone2024',
    type: 'client',
    jobTitle: 'Hospitality Specialist',
    active: true,
    course: 'Hospitality',
    schedule: 'morning',
    startDate: '2029-09-25',
    endDate: '2031-09-24'
  }
];
