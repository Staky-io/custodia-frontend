export const sliceAddress = (adr: string, { limit = 15, start = 6, end = 7 } = {}): string => adr.length > limit ? `${adr.slice(0, start)}…${adr.slice(adr.length - end, adr.length)}` : adr
