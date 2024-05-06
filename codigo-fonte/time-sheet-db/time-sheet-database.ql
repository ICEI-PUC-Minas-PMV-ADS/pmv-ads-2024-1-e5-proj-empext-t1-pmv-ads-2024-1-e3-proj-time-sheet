CREATE TABLE "User" (
  "Id" uuid,
  "Name" text,
  "CPF" text,
  "Password" text,
  "Role" integer,
  "Status" integer,
  "TotalTime" double precision,
  "LunchTime" double precision,
  PRIMARY KEY ("Id")
);

CREATE TABLE "WorkJourney" (
  "Id" uuid,
  "UserId" uuid,
  "Date" date,
  "StartTime" time,
  "EndTime" time,
  "StartLunchTime" time,
  "EndLunchTime" time,
  PRIMARY KEY ("Id"),
  CONSTRAINT "FK_WorkJourney.UserId"
    FOREIGN KEY ("UserId")
      REFERENCES "User"("Id")
);

CREATE INDEX "Fk" ON  "WorkJourney" ("UserId");

CREATE TABLE "WorkJourneyInProgress" (
  "Id" uuid,
  "UserId" uuid,
  "Date" date,
  "StartTime" time,
  "StartLunchTime" time,
  "EndLunchTime" time,
  "EndTime" time,
  "Status" integer,
  PRIMARY KEY ("Id")
);

CREATE INDEX "Fk" ON  "WorkJourneyInProgress" ("UserId");
