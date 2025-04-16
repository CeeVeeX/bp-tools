/**
 * Bin 类表示一个容器，物品将被放入其中。
 */
export class Bin {
  /**
   * 构造函数，用于初始化容器的属性。
   * @param {string} name - 容器的名称。
   * @param {number} width - 容器的宽度。
   * @param {number} height - 容器的高度。
   * @param {number} depth - 容器的深度。
   * @param {number} maxWeight - 容器的最大承重。
   * @param {Item[]} [items] - 容器中已有的物品列表，默认为空数组。
   */
  constructor(
    public name: string,
    public width: number,
    public height: number,
    public depth: number,
    public maxWeight: number,
    public items: Item[] = [],
  ) { }

  /**
   * 获取容器的名称。
   * @returns {string} 容器的名称。
   */
  getName(): string {
    return this.name
  }

  /**
   * 获取容器的宽度。
   * @returns {number} 容器的宽度。
   */
  getWidth(): number {
    return this.width
  }

  /**
   * 获取容器的高度。
   * @returns {number} 容器的高度。
   */
  getHeight(): number {
    return this.height
  }

  /**
   * 获取容器的深度。
   * @returns {number} 容器的深度。
   */
  getDepth(): number {
    return this.depth
  }

  /**
   * 获取容器的体积。
   * @returns {number} 容器的体积，通过宽度、高度和深度相乘得到。
   */
  getVolume(): number {
    return this.width * this.height * this.depth
  }

  /**
   * 获取容器的最大承重。
   * @returns {number} 容器的最大承重。
   */
  getMaxWeight(): number {
    return this.maxWeight
  }

  /**
   * 尝试将物品放入容器的指定枢轴位置。
   * @param {Item} item - 要放入的物品。
   * @param {Pivot} p - 物品要放置的枢轴位置。
   * @returns {boolean} 如果物品成功放入容器，返回 true；否则返回 false。
   */
  putItem(item: Item, p: Pivot): boolean {
    item.position = p
    for (let i = 0; i < 6; i++) {
      item.rotationType = i as RotationType
      const d = item.getDimension()
      if (
        this.width < p[0] + d[0]
        || this.height < p[1] + d[1]
        || this.depth < p[2] + d[2]
      ) {
        continue
      }
      let fit = true
      for (const ib of this.items) {
        if (ib.intersect(item)) {
          fit = false
          break
        }
      }
      if (fit) {
        this.items.push(item)
      }
      return fit
    }
    return false
  }

  /**
   * 重写 toString 方法，方便打印容器的信息。
   * @returns {string} 包含容器名称、尺寸和最大承重的字符串。
   */
  toString(): string {
    return `${this.getName()}(${this.getWidth()}x${this.getHeight()}x${this.getDepth()}, max_weight:${this.getMaxWeight()})`
  }
}

/**
 * 容器切片类型，用于排序。
 */
export type BinSlice = Bin[]

/**
 * 物品旋转类型枚举。
 */
export enum RotationType {
  RotationType_WHD = 0,
  RotationType_HWD = 1,
  RotationType_HDW = 2,
  RotationType_DHW = 3,
  RotationType_DWH = 4,
  RotationType_WDH = 5,
}

/**
 * 旋转类型字符串数组，用于将枚举值转换为可读字符串。
 */
export const RotationTypeStrings = [
  'RotationType_WHD (w,h,d)',
  'RotationType_HWD (h,w,d)',
  'RotationType_HDW (h,d,w)',
  'RotationType_DHW (d,h,w)',
  'RotationType_DWH (d,w,h)',
  'RotationType_WDH (w,d,h)',
]

/**
 * 轴枚举，用于表示不同的维度轴。
 */
export enum Axis {
  WidthAxis = 0,
  HeightAxis = 1,
  DepthAxis = 2,
}

/**
 * 枢轴类型，是一个包含三个数字的数组，分别表示 x、y、z 坐标。
 */
export type Pivot = [number, number, number]

/**
 * 尺寸类型，是一个包含三个数字的数组，分别表示宽度、高度和深度。
 */
export type Dimension = [number, number, number]

/**
 * Item 类表示一个物品，包含物品的属性和相关方法。
 */
export class Item {
  /**
   * 构造函数，用于初始化物品的属性。
   * @param {string} name - 物品的名称。
   * @param {number} width - 物品的宽度。
   * @param {number} height - 物品的高度。
   * @param {number} depth - 物品的深度。
   * @param {number} weight - 物品的重量。
   * @param {RotationType} [rotationType] - 物品的旋转类型，默认为 RotationType_WHD。
   * @param {Pivot} [position] - 物品的位置，默认为 [0, 0, 0]。
   */
  constructor(
    public name: string,
    public width: number,
    public height: number,
    public depth: number,
    public weight: number,
    public rotationType: RotationType = RotationType.RotationType_WHD,
    public position: Pivot = [0, 0, 0],
  ) { }

  /**
   * 获取物品的名称。
   * @returns {string} 物品的名称。
   */
  getName(): string {
    return this.name
  }

  /**
   * 获取物品的宽度。
   * @returns {number} 物品的宽度。
   */
  getWidth(): number {
    return this.width
  }

  /**
   * 获取物品的高度。
   * @returns {number} 物品的高度。
   */
  getHeight(): number {
    return this.height
  }

  /**
   * 获取物品的深度。
   * @returns {number} 物品的深度。
   */
  getDepth(): number {
    return this.depth
  }

  /**
   * 获取物品的体积。
   * @returns {number} 物品的体积，通过宽度、高度和深度相乘得到。
   */
  getVolume(): number {
    return this.width * this.height * this.depth
  }

  /**
   * 获取物品的重量。
   * @returns {number} 物品的重量。
   */
  getWeight(): number {
    return this.weight
  }

  /**
   * 获取物品在当前旋转类型下的尺寸。
   * @returns {Dimension} 包含物品宽度、高度和深度的尺寸数组。
   */
  getDimension(): Dimension {
    switch (this.rotationType) {
      case RotationType.RotationType_WHD:
        return [this.getWidth(), this.getHeight(), this.getDepth()]
      case RotationType.RotationType_HWD:
        return [this.getHeight(), this.getWidth(), this.getDepth()]
      case RotationType.RotationType_HDW:
        return [this.getHeight(), this.getDepth(), this.getWidth()]
      case RotationType.RotationType_DHW:
        return [this.getDepth(), this.getHeight(), this.getWidth()]
      case RotationType.RotationType_DWH:
        return [this.getDepth(), this.getWidth(), this.getHeight()]
      case RotationType.RotationType_WDH:
        return [this.getWidth(), this.getDepth(), this.getHeight()]
      default:
        return [0, 0, 0]
    }
  }

  /**
   * 检查两个物品是否相交。
   * @param {Item} i2 - 要检查相交的另一个物品。
   * @returns {boolean} 如果两个物品相交，返回 true；否则返回 false。
   */
  intersect(i2: Item): boolean {
    return (
      rectIntersect(this, i2, Axis.WidthAxis, Axis.HeightAxis)
      && rectIntersect(this, i2, Axis.HeightAxis, Axis.DepthAxis)
      && rectIntersect(this, i2, Axis.WidthAxis, Axis.DepthAxis)
    )
  }

  /**
   * 重写 toString 方法，方便打印物品的信息。
   * @returns {string} 包含物品名称、尺寸、重量、位置和旋转类型的字符串。
   */
  toString(): string {
    return `${this.getName()}(${this.getWidth()}x${this.getHeight()}x${this.getDepth()}, weight: ${this.getWeight()}) pos(${this.position}) rt(${RotationTypeStrings[this.rotationType]})`
  }
}

/**
 * 物品切片类型，用于排序。
 */
export type ItemSlice = Item[]

/**
 * 检查两个物品在指定轴上的矩形是否相交。
 * @param {Item} i1 - 第一个物品。
 * @param {Item} i2 - 第二个物品。
 * @param {Axis} x - 用于检查相交的 x 轴。
 * @param {Axis} y - 用于检查相交的 y 轴。
 * @returns {boolean} 如果两个物品在指定轴上的矩形相交，返回 true；否则返回 false。
 */
export function rectIntersect(
  i1: Item,
  i2: Item,
  x: Axis,
  y: Axis,
): boolean {
  const d1 = i1.getDimension()
  const d2 = i2.getDimension()
  const cx1 = i1.position[x] + d1[x] / 2
  const cy1 = i1.position[y] + d1[y] / 2
  const cx2 = i2.position[x] + d2[x] / 2
  const cy2 = i2.position[y] + d2[y] / 2
  const ix = Math.max(cx1, cx2) - Math.min(cx1, cx2)
  const iy = Math.max(cy1, cy2) - Math.min(cy1, cy2)
  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2
}

/**
 * Packer 类负责将物品打包到容器中。
 */
export class Packer {
  /**
   * 构造函数，用于初始化打包器的属性。
   * @param {Bin[]} [bins] - 可用的容器列表，默认为空数组。
   * @param {Item[]} [items] - 要打包的物品列表，默认为空数组。
   * @param {Item[]} [unfitItems] - 不适合放入任何容器的物品列表，默认为空数组。
   */
  constructor(
    public bins: Bin[] = [],
    public items: Item[] = [],
    public unfitItems: Item[] = [],
  ) { }

  /**
   * 添加容器到可用容器列表中。
   * @param {...Bin[]} bins - 要添加的容器。
   */
  addBin(...bins: Bin[]): void {
    this.bins.push(...bins)
  }

  /**
   * 添加物品到要打包的物品列表中。
   * @param {...Item[]} items - 要添加的物品。
   */
  addItem(...items: Item[]): void {
    this.items.push(...items)
  }

  /**
   * 执行打包操作，将物品依次放入合适的容器中。
   */
  pack(): void {
    this.bins.sort((a, b) => a.getVolume() - b.getVolume())
    this.items.sort((a, b) => b.getVolume() - a.getVolume())
    while (this.items.length > 0) {
      const bin = this.findFittedBin(this.items[0])
      if (!bin) {
        this.unfitItem()
        continue
      }
      this.items = this.packToBin(bin, this.items)
    }
  }

  /**
   * 将不适合的物品移到 unfitItems 数组中。
   */
  unfitItem(): void {
    if (this.items.length === 0) {
      return
    }
    this.unfitItems.push(this.items.shift()!)
  }

  /**
   * 将物品打包到指定容器中，返回未打包的物品。
   * @param {Bin} b - 要打包物品的容器。
   * @param {Item[]} items - 要打包的物品列表。
   * @returns {Item[]} 未打包的物品列表。
   */
  packToBin(b: Bin, items: Item[]): Item[] {
    if (!b.putItem(items[0], [0, 0, 0])) {
      const b2 = this.getBiggerBinThan(b)
      if (b2) {
        return this.packToBin(b2, items)
      }
      return this.items
    }
    const unpacked: Item[] = []
    for (const i of items.slice(1)) {
      let fitted = false
      loop: {
        for (let pt = 0; pt < 3; pt++) {
          for (const ib of b.items) {
            let pv: Pivot
            switch (pt) {
              case Axis.WidthAxis:
                pv = [
                  ib.position[0] + ib.getWidth(),
                  ib.position[1],
                  ib.position[2],
                ]
                break
              case Axis.HeightAxis:
                pv = [
                  ib.position[0],
                  ib.position[1] + ib.getHeight(),
                  ib.position[2],
                ]
                break
              case Axis.DepthAxis:
                pv = [
                  ib.position[0],
                  ib.position[1],
                  ib.position[2] + ib.getDepth(),
                ]
                break
              default:
                pv = [0, 0, 0]
            }
            if (b.putItem(i, pv)) {
              fitted = true
              break loop
            }
          }
        }
      }
      if (!fitted) {
        for (
          let b2 = this.getBiggerBinThan(b);
          b2;
          b2 = this.getBiggerBinThan(b)
        ) {
          const left = this.packToBin(
            b2,
            [...b2.items, i],
          )
          if (left.length === 0) {
            b = b2
            fitted = true
            break
          }
        }
        if (!fitted) {
          unpacked.push(i)
        }
      }
    }
    return unpacked
  }

  /**
   * 获取比指定容器体积更大的容器。
   * @param {Bin} b - 参考容器。
   * @returns {Bin | null} 如果找到比参考容器体积更大的容器，返回该容器；否则返回 null。
   */
  getBiggerBinThan(b: Bin): Bin | null {
    const v = b.getVolume()
    for (const b2 of this.bins) {
      if (b2.getVolume() > v) {
        return b2
      }
    }
    return null
  }

  /**
   * 查找适合放置指定物品的容器。
   * @param {Item} i - 要放置的物品。
   * @returns {Bin | null} 如果找到适合的容器，返回该容器；否则返回 null。
   */
  findFittedBin(i: Item): Bin | null {
    for (const b of this.bins) {
      if (!b.putItem(i, [0, 0, 0])) {
        continue
      }
      if (b.items.length === 1 && b.items[0] === i) {
        b.items = []
      }
      return b
    }
    return null
  }
}
