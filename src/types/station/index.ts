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

interface IChargeDevice {
  id: string
  voltage: string
  current: string
  power: string
  tem: string
  status: number
  record?: Array<{
    time: string
    msg: string
  }>
  percent?: string
}

interface IPileType {
  id: string
  name: string
  list: IChargeDevice[]
}

export type { IRowType, IRevenueType, IChargeDevice, IPileType }
