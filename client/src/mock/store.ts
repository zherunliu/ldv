import { faker } from '@faker-js/faker'

// Helper to generate station data
const createStation = (id: number) => ({
  id: `VXZ${10000 + id}`,
  name: `${faker.location.city()}充电站`,
  city: faker.location.city(),
  fast: faker.number.int({ min: 50, max: 150 }),
  slow: faker.number.int({ min: 20, max: 80 }),
  status: faker.number.int({ min: 1, max: 3 }),
  now: faker.number.int({ min: 0, max: 30 }),
  fault: faker.number.int({ min: 0, max: 5 }),
  person: faker.person.fullName(),
  tel: faker.phone.number(),
  // Fields for map
  position: [faker.location.longitude(), faker.location.latitude()],
  title: `${faker.location.city()}充电站`, // Same as name?
  count: faker.number.int({ min: 50, max: 150 }),
})

export const stations = Array.from({ length: 50 }, (_, i) => createStation(i + 1))

// Helper to generate revenue data
const createRevenue = (id: number) => ({
  id: `VXZ${10000 + id}`,
  name: `${faker.location.city()}充电站`,
  city: faker.location.city(),
  count: faker.number.int({ min: 100, max: 200 }),
  electricity: faker.number.int({ min: 5000, max: 10000 }),
  parkingFee: faker.number.int({ min: 1000, max: 5000 }),
  serviceFee: faker.number.int({ min: 3000, max: 8000 }),
  month: faker.number.int({ min: 2000, max: 6000 }),
  member: faker.number.int({ min: 1000, max: 4000 }),
  percent: faker.number.float({ min: -10, max: 10, fractionDigits: 1 }),
  mpercent: faker.number.float({ min: -5, max: 5, fractionDigits: 1 }),
})

export const revenueStations = Array.from({ length: 50 }, (_, i) => createRevenue(i + 1))

// Helper to generate charging pile data
const createChargingPile = (id: number) => {
  const stationName = `${faker.location.city()}充电站`
  const piles = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, (_, i) => ({
    id: `CD${1000 + i}`,
    voltage: '314v',
    current: '212.2A',
    power: '21KW',
    tem: `${faker.number.int({ min: 20, max: 40 })}°c`,
    status: faker.number.int({ min: 1, max: 6 }),
    record: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      time: faker.date.recent().toLocaleTimeString(),
      msg: `充电${faker.number.int({ min: 10, max: 100 })}度，消费${faker.number.int({ min: 10, max: 100 })}元`,
    })),
    percent: `${faker.number.int({ min: 0, max: 100 })}%`,
  }))

  return {
    id: `VXZ${10000 + id}`,
    name: stationName,
    list: piles,
  }
}

export const chargingPiles = Array.from({ length: 10 }, (_, i) => createChargingPile(i + 1))
