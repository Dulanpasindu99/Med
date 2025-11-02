-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_dispensaryId_fkey";

-- DropForeignKey
ALTER TABLE "UserDispensaryMembership" DROP CONSTRAINT "UserDispensaryMembership_dispensaryId_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dispensaryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserDispensaryMembership" ALTER COLUMN "dispensaryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserDispensaryMembership" ADD CONSTRAINT "UserDispensaryMembership_dispensaryId_fkey" FOREIGN KEY ("dispensaryId") REFERENCES "Dispensary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dispensaryId_fkey" FOREIGN KEY ("dispensaryId") REFERENCES "Dispensary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
