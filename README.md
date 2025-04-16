# `bp-tools` - 三维装箱算法实现

## 简介
`bp-tools` 是一个用于三维装箱问题的库。该代码是从 Go 语言包 [bp3d](https://github.com/gedex/bp3d) 移植而来,而这个 Go 包的实现是基于 [这篇论文](http://www.cs.ukzn.ac.za/publications/erick_dube_507-034.pdf)

## 安装
你可以使用 npm 或 yarn 来安装这个包：

### 使用 npm
```bash
npm install bp-tools
```

### 使用 yarn
```bash
yarn add bp-tools
```

### 使用 pnpm
```bash
pnpm add bp-tools
```

## 使用方法

### 导入模块
```typescript
import { Bin, Item, Packer } from 'bp-tools'
```

### 创建容器和物品
```typescript
// 创建容器
const bin = new Bin('MyBin', 100, 100, 100, 1000)

// 创建物品
const item1 = new Item('Item1', 10, 10, 10, 10)
const item2 = new Item('Item2', 20, 20, 20, 20)
```

### 创建打包器并添加容器和物品
```typescript
const packer = new Packer()
packer.addBin(bin)
packer.addItem(item1, item2)
```

### 执行打包操作
```typescript
packer.pack()
```

### 查看打包结果
```typescript
// 查看容器中的物品
console.log(bin.items)

// 查看不适合的物品
console.log(packer.unfitItems)
```

## API 文档

### `Bin` 类
- **构造函数**：`new Bin(name: string, width: number, height: number, depth: number, maxWeight: number, items?: Item[])`
  - `name`：容器的名称
  - `width`：容器的宽度
  - `height`：容器的高度
  - `depth`：容器的深度
  - `maxWeight`：容器的最大承重
  - `items`：容器中已有的物品列表（可选）

- **方法**：
  - `getName(): string`：获取容器的名称
  - `getWidth(): number`：获取容器的宽度
  - `getHeight(): number`：获取容器的高度
  - `getDepth(): number`：获取容器的深度
  - `getVolume(): number`：获取容器的体积
  - `getMaxWeight(): number`：获取容器的最大承重
  - `putItem(item: Item, p: Pivot): boolean`：尝试将物品放入容器的指定枢轴位置
  - `toString(): string`：返回容器的字符串表示形式

### `Item` 类
- **构造函数**：`new Item(name: string, width: number, height: number, depth: number, weight: number, rotationType?: RotationType, position?: Pivot)`
  - `name`：物品的名称
  - `width`：物品的宽度
  - `height`：物品的高度
  - `depth`：物品的深度
  - `weight`：物品的重量
  - `rotationType`：物品的旋转类型（可选，默认为 `RotationType.RotationType_WHD`）
  - `position`：物品的位置（可选，默认为 `[0, 0, 0]`）

- **方法**：
  - `getName(): string`：获取物品的名称
  - `getWidth(): number`：获取物品的宽度
  - `getHeight(): number`：获取物品的高度
  - `getDepth(): number`：获取物品的深度
  - `getVolume(): number`：获取物品的体积
  - `getWeight(): number`：获取物品的重量
  - `getDimension(): Dimension`：获取物品在当前旋转类型下的尺寸
  - `intersect(i2: Item): boolean`：检查两个物品是否相交
  - `toString(): string`：返回物品的字符串表示形式

### `Packer` 类
- **构造函数**：`new Packer(bins?: Bin[], items?: Item[], unfitItems?: Item[])`
  - `bins`：可用的容器列表（可选）
  - `items`：要打包的物品列表（可选）
  - `unfitItems`：不适合放入任何容器的物品列表（可选）

- **方法**：
  - `addBin(...bins: Bin[]): void`：添加容器到可用容器列表中
  - `addItem(...items: Item[]): void`：添加物品到要打包的物品列表中
  - `pack(): void`：执行打包操作
  - `unfitItem(): void`：将不适合的物品移到 `unfitItems` 数组中
  - `packToBin(b: Bin, items: Item[]): Item[]`：将物品打包到指定容器中，返回未打包的物品
  - `getBiggerBinThan(b: Bin): Bin | null`：获取比指定容器体积更大的容器
  - `findFittedBin(i: Item): Bin | null`：查找适合放置指定物品的容器

## 测试
你可以使用 Vitest 来运行测试用例。确保你已经安装了 Vitest：

```bash
npm install --save-dev vitest
```

然后在项目根目录下运行测试：

```bash
npx vitest
```

## 贡献
如果你发现了 bug 或者有改进的建议，欢迎提交 issue 或 pull request。在提交代码之前，请确保你的代码通过了测试。
