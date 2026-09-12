CREATE TYPE "PrinterStatus" AS ENUM ('IDLE', 'PRINTING', 'MAINTENANCE', 'OFFLINE');
CREATE TYPE "PrintJobStatus" AS ENUM ('PLANNED', 'PRINTING', 'COMPLETED', 'FAILED', 'CANCELLED');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Filament" (
  "id" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "material" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "initialGrams" INTEGER NOT NULL,
  "remainingGrams" INTEGER NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Filament_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Printer" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "status" "PrinterStatus" NOT NULL DEFAULT 'IDLE',
  "powerWatts" INTEGER NOT NULL,
  "purchasePrice" DECIMAL(10,2),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PrintJob" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "status" "PrintJobStatus" NOT NULL DEFAULT 'PLANNED',
  "filamentGrams" INTEGER NOT NULL,
  "durationMins" INTEGER NOT NULL,
  "salePrice" DECIMAL(10,2),
  "printerId" TEXT NOT NULL,
  "filamentId" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PrintJob_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Maintenance" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "performedAt" TIMESTAMP(3) NOT NULL,
  "nextDueAt" TIMESTAMP(3),
  "cost" DECIMAL(10,2),
  "printerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "Filament_material_idx" ON "Filament"("material");
CREATE UNIQUE INDEX "Printer_name_key" ON "Printer"("name");
CREATE INDEX "PrintJob_printerId_status_idx" ON "PrintJob"("printerId", "status");
CREATE INDEX "PrintJob_filamentId_idx" ON "PrintJob"("filamentId");
CREATE INDEX "Maintenance_printerId_performedAt_idx" ON "Maintenance"("printerId", "performedAt");

ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_filamentId_fkey" FOREIGN KEY ("filamentId") REFERENCES "Filament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
