-- CreateTable
CREATE TABLE "PlantedCrop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlantedCrop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "docNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "totalArea" INTEGER,
    "arableArea" INTEGER,
    "vegatationArea" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_docNumber_key" ON "Farmer"("docNumber");

-- AddForeignKey
ALTER TABLE "PlantedCrop" ADD CONSTRAINT "PlantedCrop_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
