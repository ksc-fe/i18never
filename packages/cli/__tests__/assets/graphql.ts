import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArgsDiscount = {
  discount: Scalars['String'];
  name: Scalars['String'];
};

export type BillType = {
  __typename?: 'BillType';
  billTypeEnName: Scalars['String'];
  billTypeId: Scalars['Int'];
  billTypeName: Scalars['String'];
};

export type BmTypeConf = {
  __typename?: 'BmTypeConf';
  Cpu?: Maybe<Scalars['String']>;
  CpuCoreCount?: Maybe<Scalars['Float']>;
  CpuCount?: Maybe<Scalars['Float']>;
  CpuFreq?: Maybe<Scalars['Float']>;
  DataDisk?: Maybe<EpcDisk>;
  Gpu?: Maybe<Scalars['String']>;
  GpuCoreCount?: Maybe<Scalars['Float']>;
  GpuCount?: Maybe<Scalars['Float']>;
  GpuFreq?: Maybe<Scalars['Float']>;
  IsStandard?: Maybe<Scalars['Boolean']>;
  Memory?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  NvmeDisk?: Maybe<EpcDisk>;
  ProductCategory?: Maybe<Scalars['String']>;
  ProductGroup?: Maybe<Scalars['String']>;
  ProductType?: Maybe<Scalars['String']>;
  SystemDisk?: Maybe<EpcDisk>;
  Type: Scalars['String'];
  TypeCode?: Maybe<Scalars['String']>;
  TypeName?: Maybe<Scalars['String']>;
  VolumeInfo?: Maybe<VolumeInfoItem>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type CashWallet = {
  __typename?: 'CashWallet';
  alarm_threshold: Scalars['Float'];
  available_balance: Scalars['Float'];
  available_debit_card_balance: Scalars['Float'];
  balance: Scalars['Float'];
  cloudOverdraftLimit: Scalars['Float'];
  credit_limit: Scalars['Float'];
  debit_card_balance: Scalars['Float'];
  frozen_balance: Scalars['Float'];
  invoice_balance: Scalars['Float'];
  is_alarm: Scalars['Int'];
  overdraft_amount: Scalars['Float'];
  overdraft_limit: Scalars['Float'];
  reward_balance: Scalars['Float'];
  unpaid_amount_in_settlement: Scalars['Float'];
  userCanOverdraftPrepay: Scalars['Boolean'];
};

export type Compare = {
  __typename?: 'Compare';
  business?: Maybe<Scalars['String']>;
  compareResult?: Maybe<CompareResult>;
  customerName?: Maybe<Scalars['String']>;
  customerService?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Array<Discount>>;
  id?: Maybe<Scalars['Float']>;
  product?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  strategy?: Maybe<Scalars['Float']>;
};

export type CompareModel = {
  business: Scalars['String'];
  cpu: Scalars['String'];
  memory: Scalars['String'];
  num: Scalars['String'];
  product: Scalars['String'];
  productType: Scalars['String'];
  specification: Scalars['String'];
};

export type CompareResult = {
  __typename?: 'CompareResult';
  cost?: Maybe<Scalars['String']>;
  performance?: Maybe<Scalars['String']>;
};

/** 对比结果列表 */
export type Compares = {
  __typename?: 'Compares';
  NextToken?: Maybe<Scalars['Float']>;
  Results: Array<Compare>;
  TotalCount: Scalars['Float'];
};

export type CostDetails = {
  __typename?: 'CostDetails';
  business: Scalars['String'];
  details: Array<CostDetailsItem>;
  product: Scalars['String'];
  productType: Scalars['String'];
};

export type CostDetailsItem = {
  __typename?: 'CostDetailsItem';
  bandwidth: Scalars['String'];
  business: Scalars['String'];
  cost: Scalars['Float'];
  dataDiskType: Scalars['String'];
  frequency: Scalars['String'];
  hostType: Scalars['String'];
  model: Scalars['String'];
  networkPacket: Scalars['String'];
  specification: Scalars['String'];
};

/** 对比价格结果详情 */
export type CostDetailsResult = {
  __typename?: 'CostDetailsResult';
  CostDetailsResult: Array<CostDetails>;
};

/** Create Product */
export type CreateProductParams = {
  __typename?: 'CreateProductParams';
  EipProductId?: Maybe<Scalars['String']>;
  ProductId: Scalars['String'];
  VolumeProductIds?: Maybe<Scalars['String']>;
};

export type Discount = {
  __typename?: 'Discount';
  discount?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DiskConfig = {
  __typename?: 'DiskConfig';
  DiskAttribute: Scalars['String'];
  DiskCount: Scalars['Float'];
  DiskId: Scalars['String'];
  DiskSpace: Scalars['String'];
  DiskType: Scalars['String'];
  Raid: Scalars['String'];
  Space: Scalars['String'];
  SystemDiskSpace?: Maybe<Scalars['String']>;
  templateIndex: Scalars['Float'];
};

export type EpcAz = {
  __typename?: 'EpcAZ';
  azCode: Scalars['String'];
  azName: Scalars['String'];
  enName: Scalars['String'];
};

export type EpcBillType = {
  __typename?: 'EpcBillType';
  billTypeEnName: Scalars['String'];
  billTypeId: Scalars['Float'];
  billTypeName: Scalars['String'];
};

export type EpcDisk = {
  __typename?: 'EpcDisk';
  DiskInfos: Array<EpcDiskInfo>;
  DiskRaids: Array<EpcDiskRaid>;
};

export type EpcDiskInfo = {
  __typename?: 'EpcDiskInfo';
  DiskNum: Scalars['Float'];
  DiskSize: Scalars['String'];
  DiskType: Scalars['String'];
};

export type EpcDiskRaid = {
  __typename?: 'EpcDiskRaid';
  Raid: Scalars['String'];
  RaidName: Scalars['String'];
  RaidNameEn: Scalars['String'];
  Space: Scalars['String'];
};

export type EpcPackage = {
  __typename?: 'EpcPackage';
  packageCode: Scalars['String'];
  packageInfo: Array<EpcPackageInfo>;
  packageName: Scalars['String'];
  packageType: Scalars['Float'];
  refBillTypeList: Array<EpcBillType>;
  refRegionList: Array<EpcRegion>;
};

export type EpcPackageInfo = {
  __typename?: 'EpcPackageInfo';
  propCode: Scalars['String'];
  propName: Scalars['String'];
  propValue?: Maybe<Array<EpcPropValueUnion>>;
  propValueType: Scalars['Float'];
  type: Scalars['Float'];
};

/** 查询EPC价格体系 */
export type EpcPriceSystem = {
  __typename?: 'EpcPriceSystem';
  productGroupCode: Scalars['String'];
  productGroupEnName: Scalars['String'];
  productGroupId: Scalars['Float'];
  productGroupName: Scalars['String'];
  productTypeList: Array<EpcProductType>;
};

export type EpcProductType = {
  __typename?: 'EpcProductType';
  billTypeList: Array<EpcBillType>;
  packageList: Array<EpcPackage>;
  productTypeCode: Scalars['String'];
  productTypeEnName: Scalars['String'];
  productTypeId: Scalars['Float'];
  productTypeName: Scalars['String'];
  regionList: Array<EpcRegion>;
};

export type EpcPropValueNormal = {
  __typename?: 'EpcPropValueNormal';
  defaultVal: Scalars['Boolean'];
  enName: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type EpcPropValueStep = {
  __typename?: 'EpcPropValueStep';
  max: Scalars['Float'];
  min: Scalars['Float'];
  step: Scalars['Float'];
};

export type EpcPropValueUnion = EpcPropValueNormal | EpcPropValueStep;

export type EpcRaidAttribute = {
  __typename?: 'EpcRaidAttribute';
  DiskSet?: Maybe<Array<DiskConfig>>;
  HostType: Scalars['String'];
  RaidId: Scalars['String'];
  TemplateName: Scalars['String'];
};

export type EpcRegion = {
  __typename?: 'EpcRegion';
  active: Scalars['Boolean'];
  areaCode: Scalars['String'];
  areaEnName: Scalars['String'];
  areaName: Scalars['String'];
  azList: Array<EpcAz>;
  innerCode: Scalars['String'];
  regionCode: Scalars['String'];
  regionEnName: Scalars['String'];
  regionName: Scalars['String'];
  regionType: Scalars['Float'];
};

/** 查询试用额度 */
export type EpcTypeConfInfo = {
  __typename?: 'EpcTypeConfInfo';
  BmTypeConfSet?: Maybe<Array<BmTypeConf>>;
};

export type Error = {
  __typename?: 'Error';
  Code?: Maybe<Scalars['String']>;
  Message?: Maybe<Scalars['String']>;
};

export type FileSystem = {
  __typename?: 'FileSystem';
  AvailabilityZone: Scalars['String'];
  AvailabilityZoneName: Scalars['String'];
  CreationDate: Scalars['String'];
  FileSystemId: Scalars['String'];
  FileSystemName: Scalars['String'];
  FileSystemState: Scalars['String'];
  MountTargets: Array<Maybe<MountTarget>>;
  ProjectId?: Maybe<Scalars['Int']>;
  ProtocolType: Scalars['String'];
  ShortId?: Maybe<Scalars['String']>;
  Size?: Maybe<Scalars['Float']>;
  StorageType: Scalars['String'];
  UsedSize?: Maybe<Scalars['Float']>;
  VpcId: Scalars['String'];
  VpcName?: Maybe<Scalars['String']>;
  projectInfo?: Maybe<Project>;
};

export type Filter = {
  Name: Scalars['String'];
  Value: Array<Scalars['String']>;
};

/** 查询试用额度 */
export type FreeTrialAndAuth = {
  __typename?: 'FreeTrialAndAuth';
  UserData?: Maybe<UserDataType>;
};

export type GpuImageDriver = {
  __typename?: 'GpuImageDriver';
  GpuImageDriverId: Scalars['String'];
  GpuModel?: Maybe<Array<Scalars['String']>>;
  ImageNameSet?: Maybe<Array<Scalars['String']>>;
};

/** 查询GPU镜像驱动 */
export type GpuImageDriverSet = {
  __typename?: 'GpuImageDriverSet';
  GpuImagesDriverSet?: Maybe<Array<GpuImageDriver>>;
};

export type Image = {
  __typename?: 'Image';
  CreateTime?: Maybe<Scalars['String']>;
  DiskType?: Maybe<Scalars['String']>;
  EbsImageSize?: Maybe<Scalars['String']>;
  EnableContainer?: Maybe<Scalars['Boolean']>;
  ImageId?: Maybe<Scalars['String']>;
  ImageInitialization?: Maybe<Scalars['String']>;
  ImageName?: Maybe<Scalars['String']>;
  ImageType?: Maybe<Scalars['String']>;
  Name?: Maybe<Scalars['String']>;
  OsName?: Maybe<Scalars['String']>;
  OsType?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
};

export type ImageInfo = {
  __typename?: 'ImageInfo';
  ImageSet: Array<Image>;
};

export type Ipv6CidrBlockAssociation = {
  __typename?: 'Ipv6CidrBlockAssociation';
  Ipv6CidrBlock: Scalars['String'];
};

export type KeyItem = {
  __typename?: 'KeyItem';
  CreateTime?: Maybe<Scalars['String']>;
  IsChecked: Scalars['Boolean'];
  KeyId: Scalars['String'];
  KeyName: Scalars['String'];
  PublicKey: Scalars['String'];
};

export type KeySet = {
  __typename?: 'KeySet';
  KeySet?: Maybe<Array<KeyItem>>;
};

export type Monitor = {
  __typename?: 'Monitor';
  Day: Scalars['String'];
  FileSystemId: Scalars['String'];
  Hour: Scalars['String'];
  Status: Scalars['String'];
  UsedSize: Scalars['Float'];
};

export type MountTarget = {
  __typename?: 'MountTarget';
  CreationDate: Scalars['String'];
  IpAddress?: Maybe<Scalars['String']>;
  MountTargetId: Scalars['String'];
  MountTargetState: Scalars['String'];
  SubnetId: Scalars['String'];
  SubnetName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCompare: Result;
  UpdateCompare: Result;
  addBook?: Maybe<Book>;
  addFileSystem?: Maybe<Scalars['Boolean']>;
  addMount?: Maybe<FileSystem>;
  changeAuthor?: Maybe<Book>;
  changeFileSystemName?: Maybe<FileSystem>;
  changeProject: Scalars['Boolean'];
  deleteFileSystem?: Maybe<Scalars['Boolean']>;
  nasPermission: Scalars['Boolean'];
  removeMount?: Maybe<Scalars['Boolean']>;
  trialConvert: Scalars['Boolean'];
};


export type MutationCreateCompareArgs = {
  business: Scalars['String'];
  compareModel?: InputMaybe<Array<CompareModel>>;
  customerName: Scalars['String'];
  customerService: Scalars['Float'];
  discounts?: InputMaybe<Array<ArgsDiscount>>;
  product: Scalars['String'];
  projectName: Scalars['String'];
  region: Scalars['String'];
  strategy: Scalars['Float'];
};


export type MutationUpdateCompareArgs = {
  business: Scalars['String'];
  compareModel?: InputMaybe<Array<CompareModel>>;
  customerName: Scalars['String'];
  customerService: Scalars['Float'];
  discounts?: InputMaybe<Array<ArgsDiscount>>;
  id: Scalars['Float'];
  product: Scalars['String'];
  projectName: Scalars['String'];
  region: Scalars['String'];
  strategy: Scalars['Float'];
};


export type MutationAddBookArgs = {
  author: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddFileSystemArgs = {
  data: NewFileSystem;
};


export type MutationAddMountArgs = {
  FileSystemId: Scalars['String'];
  IpVersion: Scalars['String'];
  Region: Scalars['String'];
  SubnetId: Scalars['String'];
};


export type MutationChangeAuthorArgs = {
  author: Scalars['String'];
  id: Scalars['String'];
};


export type MutationChangeFileSystemNameArgs = {
  FileSystemId: Scalars['String'];
  FileSystemName: Scalars['String'];
  Region: Scalars['String'];
};


export type MutationChangeProjectArgs = {
  Region: Scalars['String'];
  fileSystemIds: Array<Scalars['String']>;
  projectId: Scalars['Int'];
};


export type MutationDeleteFileSystemArgs = {
  FileSystemId: Scalars['String'];
  Region: Scalars['String'];
};


export type MutationNasPermissionArgs = {
  ProductWhat: Scalars['Int'];
  Region: Scalars['String'];
};


export type MutationRemoveMountArgs = {
  MountTargetId: Scalars['String'];
  Region: Scalars['String'];
};


export type MutationTrialConvertArgs = {
  BillType: Scalars['Int'];
  InstanceId: Scalars['String'];
  Region: Scalars['String'];
};

export type NewFileSystem = {
  AvailabilityZone: Scalars['String'];
  FileSystemName: Scalars['String'];
  IpVersion: Scalars['String'];
  ProjectId: Scalars['Int'];
  ProtocolType: Scalars['String'];
  Region: Scalars['String'];
  StorageType: Scalars['String'];
  SubnetId: Scalars['String'];
  VpcId: Scalars['String'];
};

export type PaginationFileSystems = {
  __typename?: 'PaginationFileSystems';
  FileSystemCount: Scalars['Int'];
  FileSystems?: Maybe<Array<Maybe<FileSystem>>>;
  Marker: Scalars['Int'];
};

export type Performance = {
  __typename?: 'Performance';
  business: Scalars['String'];
  result: Scalars['String'];
  rule: Scalars['String'];
  score: Scalars['String'];
  testCase: Scalars['String'];
  type: Scalars['String'];
  vmDetails: Scalars['String'];
};

/** 对比性能结果详情 */
export type PerformanceDetailsResult = {
  __typename?: 'PerformanceDetailsResult';
  PerformanceDetailsResult?: Maybe<Array<Performance>>;
};

export type Permission = {
  __typename?: 'Permission';
  billType?: Maybe<Scalars['Int']>;
  hasNasPermission: Scalars['Boolean'];
  instanceId?: Maybe<Scalars['String']>;
  productWhat?: Maybe<Scalars['Int']>;
};

export type PriceItem = {
  __typename?: 'PriceItem';
  packageCode: Scalars['String'];
  price: Scalars['Float'];
};

export type PriceParams = {
  __typename?: 'PriceParams';
  TotalPrice: Scalars['Float'];
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  productGroupCode: Scalars['String'];
  productGroupId: Scalars['Int'];
  productGroupName: Scalars['String'];
  productTypeList: Array<Maybe<ProductType>>;
};

export type ProductType = {
  __typename?: 'ProductType';
  billTypeList: Array<Maybe<BillType>>;
  productTypeCode: Scalars['String'];
  productTypeEnName: Scalars['String'];
  productTypeId: Scalars['Int'];
  productTypeName: Scalars['String'];
  propertyList: Array<Maybe<Property>>;
  regionList: Array<Maybe<Region>>;
};

export type Project = {
  __typename?: 'Project';
  AccountId: Scalars['String'];
  CreateTime: Scalars['String'];
  Krn: Scalars['String'];
  ProjectDesc?: Maybe<Scalars['String']>;
  ProjectId: Scalars['Int'];
  ProjectName: Scalars['String'];
  Status: Scalars['Int'];
};

export type ProjectItem = {
  __typename?: 'ProjectItem';
  AccountId: Scalars['String'];
  Krn?: Maybe<Scalars['String']>;
  ProjectDesc: Scalars['String'];
  ProjectId: Scalars['Float'];
  ProjectName: Scalars['String'];
  Status: Scalars['Float'];
};

export type ProjectList = {
  __typename?: 'ProjectList';
  ProjectList?: Maybe<Array<ProjectItem>>;
};

export type PropValue = {
  __typename?: 'PropValue';
  max: Scalars['Int'];
  min: Scalars['Int'];
  step: Scalars['Int'];
};

export type Property = {
  __typename?: 'Property';
  propCode: Scalars['String'];
  propName: Scalars['String'];
  propValue: Array<Maybe<PropValue>>;
  propValueType: Scalars['Int'];
  type: Scalars['Int'];
};

export type QosInfo = {
  __typename?: 'QosInfo';
  Qos?: Maybe<QosItem>;
};

export type QosItem = {
  __typename?: 'QosItem';
  ReadBytesSec?: Maybe<Scalars['Float']>;
  ReadIopsSec?: Maybe<Scalars['Float']>;
  TotalBytesSec?: Maybe<Scalars['Float']>;
  TotalIopsSec?: Maybe<Scalars['Float']>;
  WriteBytesSec?: Maybe<Scalars['Float']>;
  WriteIopsSec?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  BatchCalculateProduct: PriceParams;
  BatchCalculateProductByModel: Array<PriceItem>;
  CalculateEbsQuotas: QosInfo;
  CheckIfEnableRaidTemplate: RaidTemplate;
  CheckSgDeny: SgDeny;
  CompareCostDetails: CostDetailsResult;
  ComparePerformanceDetails: PerformanceDetailsResult;
  CreateProduct: CreateProductParams;
  DescribeCompare: Compares;
  DescribeGpuImageDriver: GpuImageDriverSet;
  DescribeImages: ImageInfo;
  DescribeKeys: KeySet;
  DescribeShareImage: SharePermissionInfo;
  DescribeStockSizes: StockSetInfo;
  EpcPriceSystem: EpcPriceSystem;
  EpcRaidAttributes: RaidAttribute;
  EpcTypeConfInfo: EpcTypeConfInfo;
  FreeTrialAndAuth: FreeTrialAndAuth;
  GetAccountAllProjectList: ProjectList;
  books?: Maybe<Array<Maybe<Book>>>;
  cashWallet: CashWallet;
  fileSystems?: Maybe<PaginationFileSystems>;
  monitor?: Maybe<Array<Maybe<Monitor>>>;
  permission: Permission;
  productGroups?: Maybe<Array<Maybe<ProductGroup>>>;
  projects?: Maybe<Array<Project>>;
  quota?: Maybe<Quota>;
  trialWallet: TrialWallet;
  vpcList?: Maybe<VpcList>;
};


export type QueryBatchCalculateProductArgs = {
  BillType: Scalars['Float'];
  Duration: Scalars['Float'];
  Model: Scalars['String'];
  ProductUse: Scalars['Float'];
  ProductWhat: Scalars['Float'];
  Region: Scalars['String'];
};


export type QueryBatchCalculateProductByModelArgs = {
  Region: Scalars['String'];
  billType: Scalars['Float'];
  duration: Scalars['Float'];
  models: Scalars['String'];
  productUse: Scalars['Float'];
  productWhat: Scalars['Float'];
  serviceEndTime: Scalars['String'];
};


export type QueryCalculateEbsQuotasArgs = {
  Region: Scalars['String'];
  Size: Scalars['Float'];
  volumeType: Scalars['String'];
};


export type QueryCheckIfEnableRaidTemplateArgs = {
  HostType: Scalars['String'];
  Region: Scalars['String'];
};


export type QueryCheckSgDenyArgs = {
  Region: Scalars['String'];
};


export type QueryCompareCostDetailsArgs = {
  id: Scalars['Float'];
};


export type QueryComparePerformanceDetailsArgs = {
  business: Scalars['String'];
  businessType: Scalars['String'];
  kingType: Scalars['String'];
};


export type QueryCreateProductArgs = {
  AddressProjectId?: InputMaybe<Scalars['Float']>;
  AdvanceNvmeSetting?: InputMaybe<Scalars['String']>;
  AvailabilityZone: Scalars['String'];
  BillType: Scalars['Float'];
  BondAttribute: Scalars['String'];
  CloudMonitorAgent?: InputMaybe<Scalars['String']>;
  ComputerName?: InputMaybe<Scalars['String']>;
  ComputerNameStartNo?: InputMaybe<Scalars['String']>;
  ContainerAgent?: InputMaybe<Scalars['String']>;
  Count: Scalars['Float'];
  DataDiskCatalogue?: InputMaybe<Scalars['String']>;
  DataDiskCatalogueSuffix?: InputMaybe<Scalars['String']>;
  DataFileType: Scalars['String'];
  Duration: Scalars['Float'];
  ExtensionPrivateIpAddress?: InputMaybe<Scalars['String']>;
  ExtensionSecurityGroupIds?: InputMaybe<Scalars['String']>;
  ExtensionSubnetId?: InputMaybe<Scalars['String']>;
  GpuImageDriverId?: InputMaybe<Scalars['String']>;
  HostName: Scalars['String'];
  HostNameStartNo?: InputMaybe<Scalars['String']>;
  HyperThreading?: InputMaybe<Scalars['String']>;
  ImageId: Scalars['String'];
  KeyId?: InputMaybe<Scalars['String']>;
  Model: Scalars['String'];
  NetworkInterfaceMode: Scalars['String'];
  NvmeDatNvmeDataDiskCatalogueSuffixaFileType?: InputMaybe<Scalars['String']>;
  NvmeDataDiskCatalogue?: InputMaybe<Scalars['String']>;
  NvmeDataDiskCatalogueSuffix?: InputMaybe<Scalars['String']>;
  NvmeDataFileType?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<Scalars['String']>;
  PrivateIpAddress?: InputMaybe<Scalars['String']>;
  ProductWhat: Scalars['Float'];
  ProjectId: Scalars['Float'];
  Raid?: InputMaybe<Scalars['String']>;
  RaidId?: InputMaybe<Scalars['String']>;
  Region: Scalars['String'];
  SecurityAgent?: InputMaybe<Scalars['String']>;
  SecurityGroupIds?: InputMaybe<Scalars['String']>;
  SecurityGroupType: Scalars['Float'];
  SubnetId: Scalars['String'];
  SystemFileType: Scalars['String'];
  VpcId: Scalars['String'];
};


export type QueryDescribeCompareArgs = {
  maxResults?: InputMaybe<Scalars['Float']>;
  nextToken?: InputMaybe<Scalars['Float']>;
};


export type QueryDescribeGpuImageDriverArgs = {
  HostType: Scalars['String'];
  ImageId: Scalars['String'];
  MaxResults: Scalars['Float'];
  Region: Scalars['String'];
};


export type QueryDescribeImagesArgs = {
  Filter1Value1?: InputMaybe<Scalars['String']>;
  MaxResults: Scalars['Float'];
  NextToken: Scalars['Float'];
  Region: Scalars['String'];
};


export type QueryDescribeKeysArgs = {
  MaxResults?: InputMaybe<Scalars['Float']>;
  Region: Scalars['String'];
};


export type QueryDescribeShareImageArgs = {
  MaxResults: Scalars['Float'];
  NextToken: Scalars['Float'];
  Region: Scalars['String'];
};


export type QueryDescribeStockSizesArgs = {
  AvailabilityZone: Scalars['String'];
  Region: Scalars['String'];
};


export type QueryEpcPriceSystemArgs = {
  Product: Scalars['String'];
  Region: Scalars['String'];
};


export type QueryEpcRaidAttributesArgs = {
  HostType: Scalars['String'];
  Region: Scalars['String'];
};


export type QueryEpcTypeConfInfoArgs = {
  ProductTypes?: InputMaybe<Array<Scalars['String']>>;
  Region: Scalars['String'];
};


export type QueryFreeTrialAndAuthArgs = {
  Region: Scalars['String'];
};


export type QueryGetAccountAllProjectListArgs = {
  Region: Scalars['String'];
};


export type QueryFileSystemsArgs = {
  Filter?: InputMaybe<Array<Filter>>;
  Marker?: InputMaybe<Scalars['Int']>;
  MaxResults?: InputMaybe<Scalars['Int']>;
  ProjectIds?: InputMaybe<Scalars['String']>;
  Region: Scalars['String'];
};


export type QueryMonitorArgs = {
  EndDateTime?: InputMaybe<Scalars['String']>;
  FileSystemId: Scalars['String'];
  Region: Scalars['String'];
  StartDateTime?: InputMaybe<Scalars['String']>;
};


export type QueryPermissionArgs = {
  Region: Scalars['String'];
};


export type QueryProjectsArgs = {
  Region: Scalars['String'];
};


export type QueryQuotaArgs = {
  QuotaName: Scalars['String'];
  Region: Scalars['String'];
};


export type QueryVpcListArgs = {
  AvailabilityZone: Scalars['String'];
  Region: Scalars['String'];
};

export type Quota = {
  __typename?: 'Quota';
  MAX: Scalars['Int'];
};

/** 查询Raid盘属性 */
export type RaidAttribute = {
  __typename?: 'RaidAttribute';
  EpcRaidAttributeSet?: Maybe<Array<EpcRaidAttribute>>;
};

/** 是否启用Raid模板 */
export type RaidTemplate = {
  __typename?: 'RaidTemplate';
  enableRaidTemplate: Scalars['Boolean'];
};

export type Region = {
  __typename?: 'Region';
  areaCode: Scalars['String'];
  areaEnName: Scalars['String'];
  areaName: Scalars['String'];
  azList: Array<Maybe<Zone>>;
  innerCode: Scalars['String'];
  regionCode: Scalars['String'];
  regionEnName: Scalars['String'];
  regionName: Scalars['String'];
  regionType: Scalars['Int'];
};

/** 创建产品选型与价格对比 */
export type Result = {
  __typename?: 'Result';
  Error?: Maybe<Error>;
  Result?: Maybe<Scalars['Boolean']>;
};

export type SecurityGroup = {
  __typename?: 'SecurityGroup';
  CreateTime: Scalars['String'];
  SecurityGroupEntrySet: Array<Maybe<SecurityGroupEntry>>;
  SecurityGroupId: Scalars['String'];
  SecurityGroupName: Scalars['String'];
  SecurityGroupType: Scalars['String'];
  VpcId?: Maybe<Scalars['String']>;
};

export type SecurityGroupEntry = {
  __typename?: 'SecurityGroupEntry';
  CidrBlock: Scalars['String'];
  Direction: Scalars['String'];
  Protocol: Scalars['String'];
  SecurityGroupEntryId: Scalars['String'];
};

export type SgDeny = {
  __typename?: 'SgDeny';
  Allow: Scalars['Boolean'];
};

export type SharePermission = {
  __typename?: 'SharePermission';
  ImageId?: Maybe<Scalars['String']>;
  ImageInitialization?: Maybe<Scalars['String']>;
  ImageName?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
  System?: Maybe<Scalars['String']>;
};

export type SharePermissionInfo = {
  __typename?: 'SharePermissionInfo';
  SharePermissionSet?: Maybe<Array<SharePermission>>;
};

export type Stock = {
  __typename?: 'Stock';
  AvailabilityZone?: Maybe<Scalars['String']>;
  Bond?: Maybe<Scalars['Float']>;
  Count?: Maybe<Scalars['Float']>;
  HostType?: Maybe<Scalars['String']>;
};

export type StockSetInfo = {
  __typename?: 'StockSetInfo';
  StockSet: Array<Stock>;
};

export type Subnet = {
  __typename?: 'Subnet';
  CidrBlock: Scalars['String'];
  CreateTime: Scalars['String'];
  DhcpIpFrom: Scalars['String'];
  DhcpIpTo: Scalars['String'];
  GatewayIp: Scalars['String'];
  ProvidedIpv6CidrBlock: Scalars['Boolean'];
  SubnetId: Scalars['String'];
  SubnetName: Scalars['String'];
  SubnetType: Scalars['String'];
  VpcId: Scalars['String'];
};

export type TrialWallet = {
  __typename?: 'TrialWallet';
  available_credit: Scalars['Float'];
  is_active: Scalars['Boolean'];
  status: Scalars['Boolean'];
  total_credit: Scalars['Float'];
};

export type UserDataType = {
  __typename?: 'UserDataType';
  available_credit: Scalars['Float'];
};

export type VolumeInfoItem = {
  __typename?: 'VolumeInfoItem';
  DataVolumeMaxCount?: Maybe<Scalars['Float']>;
  SameVolumeType?: Maybe<Scalars['Boolean']>;
  SmartCardVersion?: Maybe<Scalars['String']>;
  SupportAllEbs?: Maybe<Scalars['Boolean']>;
  SupportDataVolumeType?: Maybe<Array<VolumeTypeItem>>;
  SupportSystemVolumeType?: Maybe<Array<VolumeTypeItem>>;
};

export type VolumeTypeItem = {
  __typename?: 'VolumeTypeItem';
  Code: Scalars['String'];
  EnName: Scalars['String'];
  MaxSize: Scalars['Float'];
  MinSize: Scalars['Float'];
  Name: Scalars['String'];
};

export type Vpc = {
  __typename?: 'Vpc';
  CidrBlock: Scalars['String'];
  CreateTime: Scalars['String'];
  Ipv6CidrBlockAssociationSet: Array<Maybe<Ipv6CidrBlockAssociation>>;
  IsDefault: Scalars['Boolean'];
  ProvidedIpv6CidrBlock: Scalars['Boolean'];
  VpcId: Scalars['String'];
  VpcName: Scalars['String'];
};

export type VpcList = {
  __typename?: 'VpcList';
  SecurityGroupSet?: Maybe<Array<Maybe<SecurityGroup>>>;
  SubnetSet?: Maybe<Array<Maybe<Subnet>>>;
  VpcSet?: Maybe<Array<Maybe<Vpc>>>;
};

export type Zone = {
  __typename?: 'Zone';
  azCode: Scalars['String'];
  azName: Scalars['String'];
};

export type DescribeKeysQueryVariables = Exact<{
  Region?: InputMaybe<Scalars['String']>;
  MaxResults?: InputMaybe<Scalars['Float']>;
}>;


export type DescribeKeysQuery = { __typename?: 'Query', DescribeKeys: { __typename?: 'KeySet', KeySet?: Array<{ __typename?: 'KeyItem', KeyId: string, KeyName: string, IsChecked: boolean, PublicKey: string }> | null } };

export type KeyFragment = { __typename?: 'KeyItem', KeyId: string, KeyName: string, IsChecked: boolean, PublicKey: string };

export type GetAccountAllProjectListQueryVariables = Exact<{
  Region?: InputMaybe<Scalars['String']>;
}>;


export type GetAccountAllProjectListQuery = { __typename?: 'Query', GetAccountAllProjectList: { __typename?: 'ProjectList', ProjectList?: Array<{ __typename?: 'ProjectItem', AccountId: string, ProjectId: number, ProjectName: string, Status: number }> | null } };

export type ProjectFragment = { __typename?: 'ProjectItem', AccountId: string, ProjectId: number, ProjectName: string, Status: number };

export const KeyFragmentDoc = gql`
    fragment Key on KeyItem {
  KeyId
  KeyName
  IsChecked
  PublicKey
}
    `;
export const ProjectFragmentDoc = gql`
    fragment Project on ProjectItem {
  AccountId
  ProjectId
  ProjectName
  Status
}
    `;
export const DescribeKeysDocument = gql`
    query DescribeKeys($Region: String = "cn-shanghai-3", $MaxResults: Float = 9999) {
  DescribeKeys(Region: $Region, MaxResults: $MaxResults) {
    KeySet {
      ...Key
    }
  }
}
    ${KeyFragmentDoc}`;

/**
 * __useDescribeKeysQuery__
 *
 * To run a query within a Vue component, call `useDescribeKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useDescribeKeysQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDescribeKeysQuery({
 *   Region: // value for 'Region'
 *   MaxResults: // value for 'MaxResults'
 * });
 */
export function useDescribeKeysQuery(variables: DescribeKeysQueryVariables | VueCompositionApi.Ref<DescribeKeysQueryVariables> | ReactiveFunction<DescribeKeysQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<DescribeKeysQuery, DescribeKeysQueryVariables>(DescribeKeysDocument, variables, options);
}
export function useDescribeKeysLazyQuery(variables: DescribeKeysQueryVariables | VueCompositionApi.Ref<DescribeKeysQueryVariables> | ReactiveFunction<DescribeKeysQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DescribeKeysQuery, DescribeKeysQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<DescribeKeysQuery, DescribeKeysQueryVariables>(DescribeKeysDocument, variables, options);
}
export type DescribeKeysQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<DescribeKeysQuery, DescribeKeysQueryVariables>;
export const GetAccountAllProjectListDocument = gql`
    query GetAccountAllProjectList($Region: String = "cn-shanghai-3") {
  GetAccountAllProjectList(Region: $Region) {
    ProjectList {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useGetAccountAllProjectListQuery__
 *
 * To run a query within a Vue component, call `useGetAccountAllProjectListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountAllProjectListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAccountAllProjectListQuery({
 *   Region: // value for 'Region'
 * });
 */
export function useGetAccountAllProjectListQuery(variables: GetAccountAllProjectListQueryVariables | VueCompositionApi.Ref<GetAccountAllProjectListQueryVariables> | ReactiveFunction<GetAccountAllProjectListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>(GetAccountAllProjectListDocument, variables, options);
}
export function useGetAccountAllProjectListLazyQuery(variables: GetAccountAllProjectListQueryVariables | VueCompositionApi.Ref<GetAccountAllProjectListQueryVariables> | ReactiveFunction<GetAccountAllProjectListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>(GetAccountAllProjectListDocument, variables, options);
}
export type GetAccountAllProjectListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAccountAllProjectListQuery, GetAccountAllProjectListQueryVariables>;