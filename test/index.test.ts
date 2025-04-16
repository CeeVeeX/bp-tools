import { describe, expect, it } from 'vitest'
import { Bin, Item, Packer, RotationType } from '../src/index'

// 对 Bin 类进行测试
describe('bin', () => {
  // 测试创建 Bin 实例时属性是否正确初始化
  it('应该创建一个具有正确属性的 Bin 实例', () => {
    // 创建一个名为 'TestBin'，尺寸为 10x20x30，最大承重为 100 的 Bin 实例
    const bin = new Bin('TestBin', 10, 20, 30, 100)
    // 验证 Bin 的名称是否正确
    expect(bin.getName()).toBe('TestBin')
    // 验证 Bin 的宽度是否正确
    expect(bin.getWidth()).toBe(10)
    // 验证 Bin 的高度是否正确
    expect(bin.getHeight()).toBe(20)
    // 验证 Bin 的深度是否正确
    expect(bin.getDepth()).toBe(30)
    // 验证 Bin 的最大承重是否正确
    expect(bin.getMaxWeight()).toBe(100)
    // 验证 Bin 初始时物品列表为空
    expect(bin.items.length).toBe(0)
  })

  // 测试 Bin 体积计算是否正确
  it('应该正确计算 Bin 的体积', () => {
    // 创建一个尺寸为 2x3x4 的 Bin 实例
    const bin = new Bin('TestBin', 2, 3, 4, 100)
    // 验证 Bin 的体积是否为 2 * 3 * 4
    expect(bin.getVolume()).toBe(2 * 3 * 4)
  })

  // 测试当物品能放入 Bin 时，putItem 方法是否正常工作
  it('当物品能放入时应该将物品放入 Bin 中', () => {
    // 创建一个尺寸为 10x10x10 的 Bin 实例
    const bin = new Bin('TestBin', 10, 10, 10, 100)
    // 创建一个尺寸为 2x2x2 的 Item 实例
    const item = new Item('TestItem', 2, 2, 2, 1)
    // 尝试将物品放入 Bin 中
    const result = bin.putItem(item, [0, 0, 0])
    // 验证物品是否成功放入
    expect(result).toBe(true)
    // 验证 Bin 中物品列表长度是否为 1
    expect(bin.items.length).toBe(1)
    // 验证放入的物品是否为预期的物品
    expect(bin.items[0]).toBe(item)
  })

  // 测试当物品不能放入 Bin 时，putItem 方法是否正常工作
  it('当物品不能放入时不应该将物品放入 Bin 中', () => {
    // 创建一个尺寸为 1x1x1 的 Bin 实例
    const bin = new Bin('TestBin', 1, 1, 1, 100)
    // 创建一个尺寸为 2x2x2 的 Item 实例
    const item = new Item('TestItem', 2, 2, 2, 1)
    // 尝试将物品放入 Bin 中
    const result = bin.putItem(item, [0, 0, 0])
    // 验证物品是否未成功放入
    expect(result).toBe(false)
    // 验证 Bin 中物品列表长度是否为 0
    expect(bin.items.length).toBe(0)
  })
})

// 对 Item 类进行测试
describe('item', () => {
  // 测试创建 Item 实例时属性是否正确初始化
  it('应该创建一个具有正确属性的 Item 实例', () => {
    // 创建一个名为 'TestItem'，尺寸为 5x6x7，重量为 2 的 Item 实例
    const item = new Item('TestItem', 5, 6, 7, 2)
    // 验证 Item 的名称是否正确
    expect(item.getName()).toBe('TestItem')
    // 验证 Item 的宽度是否正确
    expect(item.getWidth()).toBe(5)
    // 验证 Item 的高度是否正确
    expect(item.getHeight()).toBe(6)
    // 验证 Item 的深度是否正确
    expect(item.getDepth()).toBe(7)
    // 验证 Item 的重量是否正确
    expect(item.getWeight()).toBe(2)
    // 验证 Item 的初始旋转类型是否为默认值
    expect(item.rotationType).toBe(RotationType.RotationType_WHD)
    // 验证 Item 的初始位置是否为 [0, 0, 0]
    expect(item.position).toEqual([0, 0, 0])
  })

  // 测试 Item 体积计算是否正确
  it('应该正确计算 Item 的体积', () => {
    // 创建一个尺寸为 2x3x4 的 Item 实例
    const item = new Item('TestItem', 2, 3, 4, 1)
    // 验证 Item 的体积是否为 2 * 3 * 4
    expect(item.getVolume()).toBe(2 * 3 * 4)
  })

  // 测试根据不同旋转类型获取 Item 尺寸是否正确
  it('应该根据旋转类型正确获取 Item 的尺寸', () => {
    // 创建一个尺寸为 2x3x4 的 Item 实例
    const item = new Item('TestItem', 2, 3, 4, 1)
    // 设置 Item 的旋转类型为 RotationType_HWD
    item.rotationType = RotationType.RotationType_HWD
    // 获取 Item 在当前旋转类型下的尺寸
    const dimension = item.getDimension()
    // 验证获取的尺寸是否符合预期
    expect(dimension).toEqual([3, 2, 4])
  })

  // 测试两个 Item 是否能正确判断相交情况
  it('应该正确检查两个 Item 是否相交', () => {
    // 创建两个尺寸为 2x2x2 的 Item 实例
    const item1 = new Item('Item1', 2, 2, 2, 1)
    const item2 = new Item('Item2', 2, 2, 2, 1)
    // 设置 item1 的位置为 [0, 0, 0]
    item1.position = [0, 0, 0]
    // 设置 item2 的位置为 [1, 1, 1]
    item2.position = [1, 1, 1]
    // 验证两个 Item 是否相交
    expect(item1.intersect(item2)).toBe(true)
  })
})

// 对 Packer 类进行测试
describe('packer', () => {
  // 测试 Packer 添加 Bin 和 Item 是否正确
  it('应该正确添加 Bin 和 Item', () => {
    // 创建一个 Packer 实例
    const packer = new Packer()
    // 创建两个不同尺寸的 Bin 实例
    const bin1 = new Bin('Bin1', 10, 10, 10, 100)
    const bin2 = new Bin('Bin2', 20, 20, 20, 200)
    // 创建两个不同尺寸的 Item 实例
    const item1 = new Item('Item1', 2, 2, 2, 1)
    const item2 = new Item('Item2', 3, 3, 3, 2)
    // 向 Packer 中添加 Bin 实例
    packer.addBin(bin1, bin2)
    // 向 Packer 中添加 Item 实例
    packer.addItem(item1, item2)
    // 验证 Packer 中 Bin 列表长度是否为 2
    expect(packer.bins.length).toBe(2)
    // 验证 Packer 中 Item 列表长度是否为 2
    expect(packer.items.length).toBe(2)
  })

  // 测试 Packer 是否能将 Item 正确打包到 Bin 中
  it('应该将 Item 打包到 Bin 中', () => {
    // 创建一个 Packer 实例
    const packer = new Packer()
    // 创建一个尺寸为 10x10x10 的 Bin 实例
    const bin = new Bin('Bin', 10, 10, 10, 100)
    // 创建一个尺寸为 2x2x2 的 Item 实例
    const item = new Item('Item', 2, 2, 2, 1)
    // 向 Packer 中添加 Bin 实例
    packer.addBin(bin)
    // 向 Packer 中添加 Item 实例
    packer.addItem(item)
    // 执行打包操作
    packer.pack()
    // 验证 Bin 中物品列表长度是否为 1
    expect(bin.items.length).toBe(1)
    // 验证放入 Bin 中的物品是否为预期的物品
    expect(bin.items[0]).toBe(item)
    // 验证 Packer 中不适合的物品列表长度是否为 0
    expect(packer.unfitItems.length).toBe(0)
  })

  // 测试当 Item 无法放入任何 Bin 时，是否会被移到不适合物品列表中
  it('应该将不适合的 Item 移到 unfitItems 数组中', () => {
    // 创建一个 Packer 实例
    const packer = new Packer()
    // 创建一个尺寸为 1x1x1 的 Bin 实例
    const bin = new Bin('Bin', 1, 1, 1, 100)
    // 创建一个尺寸为 2x2x2 的 Item 实例
    const item = new Item('Item', 2, 2, 2, 1)
    // 向 Packer 中添加 Bin 实例
    packer.addBin(bin)
    // 向 Packer 中添加 Item 实例
    packer.addItem(item)
    // 执行打包操作
    packer.pack()
    // 验证 Bin 中物品列表长度是否为 0
    expect(bin.items.length).toBe(0)
    // 验证 Packer 中不适合的物品列表长度是否为 1
    expect(packer.unfitItems.length).toBe(1)
    // 验证不适合的物品是否为预期的物品
    expect(packer.unfitItems[0]).toBe(item)
  })
})
