/*
  Warnings:

  - You are about to drop the column `vegatationArea` on the `Farmer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farmer" DROP COLUMN "vegatationArea",
ADD COLUMN     "vegetationArea" INTEGER;
