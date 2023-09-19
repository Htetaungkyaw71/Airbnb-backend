-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "pirce" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "belongToId" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongToId" TEXT NOT NULL,
    "belongToHomeId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongToId" TEXT NOT NULL,
    "belongToHomeId" TEXT NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Home_id_belongToId_key" ON "Home"("id", "belongToId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_id_belongToId_key" ON "Reservation"("id", "belongToId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_id_belongToHomeId_key" ON "Reservation"("id", "belongToHomeId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_id_belongToId_key" ON "Favourite"("id", "belongToId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_id_belongToHomeId_key" ON "Favourite"("id", "belongToHomeId");

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_belongToHomeId_fkey" FOREIGN KEY ("belongToHomeId") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_belongToHomeId_fkey" FOREIGN KEY ("belongToHomeId") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;
