import { type Product } from '@prisma/client';

type SearchObject = {
  manufacturer: string[];
  assignment: string[];
  frequency: string[];
  capacity: string[];
  formFactor: string[];
  socket: string[];
  chipset: string[];
  m2Count: string[];
  coreCount: string[];
  withVideo: string[];
  memoryType: string[];
  hddType: string[];
  hddFormFactor: string[];
  speed: string[];
  power: string[];
  coolerSize: string[];
  coolerType: string[];
  type?: string[];
};

export const getFilteredProducts = (
  products: Product[],
  searchObject: SearchObject,
) => {
  const {
    manufacturer,
    assignment,
    frequency,
    capacity,
    formFactor,
    socket,
    chipset,
    m2Count,
    coreCount,
    withVideo,
    memoryType,
    hddType,
    hddFormFactor,
    speed,
    power,
    coolerSize,
    coolerType,
    type = [],
  } = searchObject;

  return products.filter((product) => {
    const manufacturerMatch = manufacturer.length
      ? manufacturer.includes(product.manufacturer!)
      : true;

    const assignmentMatch = assignment.length
      ? assignment.includes(product.assignment!)
      : true;

    const frequencyMatch = frequency.length
      ? frequency.includes(product.frequency!)
      : true;

    const capacityMatch = capacity.length
      ? capacity.includes(product.capacity!)
      : true;

    const formFactorMatch = formFactor.length
      ? formFactor.includes(product.formFactor!)
      : true;

    const socketMatch = socket.length ? socket.includes(product.socket!) : true;

    const chipsetMatch = chipset.length
      ? chipset.includes(product.chipset!)
      : true;

    const m2CountMatch = m2Count.length
      ? m2Count.includes(product.m2Count!)
      : true;

    const coreCountMatch = coreCount.length
      ? coreCount.includes(`${product.coreCount}`)
      : true;

    const withVideoMatch = withVideo.length
      ? withVideo.includes(`${product.withVideo!}`)
      : true;

    const memoryTypeMatch = memoryType.length
      ? memoryType.includes(product.memoryType!)
      : true;

    const hddTypeMatch = hddType.length
      ? hddType.includes(product.hddType!)
      : true;

    const hddFormFactorMatch = hddFormFactor.length
      ? hddFormFactor.includes(product.hddFormFactor!)
      : true;

    const speedMatch = speed.length ? speed.includes(product.speed!) : true;
    const powerMatch = power.length ? power.includes(product.power!) : true;

    const coolerSizeMatch = coolerSize.length
      ? coolerSize.includes(product.coolerSize!)
      : true;

    const coolerTypeMatch = coolerType.length
      ? coolerType.includes(product.coolerType!)
      : true;

    const typeMatch = type.length ? type.includes(product.type!) : true;

    return (
      manufacturerMatch &&
      assignmentMatch &&
      frequencyMatch &&
      capacityMatch &&
      formFactorMatch &&
      socketMatch &&
      chipsetMatch &&
      m2CountMatch &&
      coreCountMatch &&
      withVideoMatch &&
      memoryTypeMatch &&
      hddTypeMatch &&
      hddFormFactorMatch &&
      speedMatch &&
      powerMatch &&
      coolerSizeMatch &&
      coolerTypeMatch &&
      typeMatch
    );
  });
};
