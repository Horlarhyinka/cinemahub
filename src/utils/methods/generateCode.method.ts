

export const generateCode = (length: number, max: number = 10) =>Math.floor(Math.random() * max ** length).toString()