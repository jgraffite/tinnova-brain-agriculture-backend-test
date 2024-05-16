/*
  Warnings:

  - Added the required column `type` to the `PlantedCrop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PLANTED_CROP_TYPES" AS ENUM ('SOYA', 'CORN', 'COTTON', 'COFFEE', 'SUGAR_CANE');

-- AlterTable
ALTER TABLE "PlantedCrop" ADD COLUMN     "type" "PLANTED_CROP_TYPES" NOT NULL;
