-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CHURCH', 'STORE', 'FARM');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "phoneNumber" CHAR(14) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "oldData" JSONB NOT NULL,
    "newData" JSONB NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchIncome" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchIncomeHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncomeHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "ChurchIncomeType" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncomeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchSpending" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "bill" VARCHAR(200) NOT NULL,
    "billNumber" VARCHAR(100) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchSpendingHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "bill" VARCHAR(200) NOT NULL,
    "billNumber" VARCHAR(100) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpendingHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "ChurchSpendingType" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpendingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreIncome" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreIncomeHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreIncomeHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "StoreIncomeType" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreIncomeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSpending" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreSpending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSpendingHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreSpendingHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "StoreSpendingType" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "StoreSpendingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmIncome" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "amount" BIGINT NOT NULL DEFAULT 1,
    "price" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmIncomeHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "incomeTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "amount" BIGINT NOT NULL DEFAULT 1,
    "price" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmIncomeHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "FarmIncomeType" (
    "id" BIGSERIAL NOT NULL,
    "incomeTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmIncomeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmSpending" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmSpending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmSpendingHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "spendingTypeId" BIGINT NOT NULL,
    "detail" TEXT NOT NULL,
    "funds" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmSpendingHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "FarmSpendingType" (
    "id" BIGSERIAL NOT NULL,
    "spendingTypeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "FarmSpendingType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "ChurchIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "ChurchIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeType" ADD CONSTRAINT "ChurchIncomeType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeType" ADD CONSTRAINT "ChurchIncomeType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "ChurchSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "ChurchSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingType" ADD CONSTRAINT "ChurchSpendingType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingType" ADD CONSTRAINT "ChurchSpendingType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncome" ADD CONSTRAINT "StoreIncome_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "StoreIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncome" ADD CONSTRAINT "StoreIncome_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncome" ADD CONSTRAINT "StoreIncome_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncomeHistory" ADD CONSTRAINT "StoreIncomeHistory_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "StoreIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncomeHistory" ADD CONSTRAINT "StoreIncomeHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncomeHistory" ADD CONSTRAINT "StoreIncomeHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncomeType" ADD CONSTRAINT "StoreIncomeType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreIncomeType" ADD CONSTRAINT "StoreIncomeType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpending" ADD CONSTRAINT "StoreSpending_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "StoreSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpending" ADD CONSTRAINT "StoreSpending_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpending" ADD CONSTRAINT "StoreSpending_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpendingHistory" ADD CONSTRAINT "StoreSpendingHistory_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "StoreSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpendingHistory" ADD CONSTRAINT "StoreSpendingHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpendingHistory" ADD CONSTRAINT "StoreSpendingHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpendingType" ADD CONSTRAINT "StoreSpendingType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSpendingType" ADD CONSTRAINT "StoreSpendingType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncome" ADD CONSTRAINT "FarmIncome_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "FarmIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncome" ADD CONSTRAINT "FarmIncome_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncome" ADD CONSTRAINT "FarmIncome_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncomeHistory" ADD CONSTRAINT "FarmIncomeHistory_incomeTypeId_fkey" FOREIGN KEY ("incomeTypeId") REFERENCES "FarmIncomeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncomeHistory" ADD CONSTRAINT "FarmIncomeHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncomeHistory" ADD CONSTRAINT "FarmIncomeHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncomeType" ADD CONSTRAINT "FarmIncomeType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmIncomeType" ADD CONSTRAINT "FarmIncomeType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpending" ADD CONSTRAINT "FarmSpending_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "FarmSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpending" ADD CONSTRAINT "FarmSpending_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpending" ADD CONSTRAINT "FarmSpending_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpendingHistory" ADD CONSTRAINT "FarmSpendingHistory_spendingTypeId_fkey" FOREIGN KEY ("spendingTypeId") REFERENCES "FarmSpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpendingHistory" ADD CONSTRAINT "FarmSpendingHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpendingHistory" ADD CONSTRAINT "FarmSpendingHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpendingType" ADD CONSTRAINT "FarmSpendingType_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmSpendingType" ADD CONSTRAINT "FarmSpendingType_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
