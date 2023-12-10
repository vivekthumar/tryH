import moment from "moment";

export const ISOTODDMMYYYY = (ISO) => {
  return moment(ISO).format('DD-MM-YYYY');
}

export const ISOTODDMMMYY = (ISO) => {
  return moment(ISO).format('DD MMM YY');
}

export const ISOTODDMMMYYHHmm = (ISO) => {
  return moment(ISO).format('DD MMM YY - HH:mm');
}



export const dateFilters = {
  ISOTODDMMYYYY: ISOTODDMMYYYY,
  ISOTODDMMMYY: ISOTODDMMMYY,
}