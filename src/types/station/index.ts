interface IRowType {
  name: string
  id: string
  city: string
  person: string
  tel: string
  fast: string
  slow: string
  status: number
  now: string
  fault: string
}

interface IRevenueType {
  name: string
  id: string
  city: string
  count: number
  electricity: number
  parkingFee: number
  serviceFee: number
  month: number
  member: number
  percent: number
  mpercent: number
}

export type { IRowType, IRevenueType }
