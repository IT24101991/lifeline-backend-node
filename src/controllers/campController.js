const Camp = require("../models/Camp");
const asyncHandler = require("../utils/asyncHandler");
const { serializeCamp } = require("../utils/serializers");
const {
  assertDateWithinNext7Days,
  assertTimeRange
} = require("../utils/scheduleValidation");

const NAME_PATTERN = /^[A-Za-z\s]+$/;
const TEXT_WITHOUT_SYMBOLS_PATTERN = /^[A-Za-z0-9\s]+$/;

const assertCampPayload = ({ name, location, address, googleMapLink, date, startTime, endTime }) => {
  if (!NAME_PATTERN.test(String(name || "").trim())) {
    throw new Error("Camp name can contain only letters and spaces");
  }

  if (location && !TEXT_WITHOUT_SYMBOLS_PATTERN.test(String(location).trim())) {
    throw new Error("Location can contain only letters, numbers, and spaces");
  }

  if (address && !TEXT_WITHOUT_SYMBOLS_PATTERN.test(String(address).trim())) {
    throw new Error("Address can contain only letters, numbers, and spaces");
  }

  if (googleMapLink) {
    let parsedUrl;
    try {
      parsedUrl = new URL(googleMapLink);
    } catch (error) {
      throw new Error("Google Map link must be a valid Google Maps place URL");
    }

    const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, "");
    if (!hostname.endsWith("google.com") || !parsedUrl.pathname.includes("/maps/place/")) {
      throw new Error("Google Map link must be a Google Maps place link");
    }
  }

  assertDateWithinNext7Days(date, "Camp date");

  if (startTime || endTime) {
    assertTimeRange(startTime, endTime);
  }
};

const getCamps = asyncHandler(async (req, res) => {
  const camps = await Camp.find({}).sort({ date: 1 });
  res.status(200).json(camps.map(serializeCamp));
});

const createCamp = asyncHandler(async (req, res) => {
  const { name, province, district, nearestHospital, location, address, googleMapLink, date, startTime, endTime, campStatus } = req.body;

  if (!name || !province || !district || !date) {
    res.status(400);
    throw new Error("Name, province, district, and date are required");
  }

  res.status(400);
  assertCampPayload({ name, location, address, googleMapLink, date, startTime, endTime });

  const camp = await Camp.create({
    name: name.trim(),
    province,
    district,
    nearestHospital,
    location: location?.trim(),
    address: address?.trim(),
    googleMapLink: googleMapLink?.trim(),
    date,
    startTime,
    endTime,
    campStatus: campStatus || "UPCOMING"
  });

  res.status(201).json(serializeCamp(camp));
});

const updateCamp = asyncHandler(async (req, res) => {
  const { name, province, district, nearestHospital, location, address, googleMapLink, date, startTime, endTime, campStatus } = req.body;

  if (!name || !province || !district || !date) {
    res.status(400);
    throw new Error("Name, province, district, and date are required");
  }

  res.status(400);
  assertCampPayload({ name, location, address, googleMapLink, date, startTime, endTime });

  const camp = await Camp.findById(req.params.id);

  if (!camp) {
    res.status(404);
    throw new Error("Camp not found");
  }

  camp.name = name.trim();
  camp.province = province;
  camp.district = district;
  camp.nearestHospital = nearestHospital;
  camp.location = location?.trim();
  camp.address = address?.trim();
  camp.googleMapLink = googleMapLink?.trim();
  camp.date = date;
  camp.startTime = startTime;
  camp.endTime = endTime;
  camp.campStatus = campStatus || "UPCOMING";

  await camp.save();

  res.status(200).json(serializeCamp(camp));
});

const deleteCamp = asyncHandler(async (req, res) => {
  const camp = await Camp.findById(req.params.id);

  if (!camp) {
    res.status(404);
    throw new Error("Camp not found");
  }

  await camp.deleteOne();
  res.status(200).json({
    success: true,
    message: "Camp deleted successfully"
  });
});

const markInterest = asyncHandler(async (req, res) => {
  const camp = await Camp.findById(req.params.id);

  if (!camp) {
    res.status(404);
    throw new Error("Camp not found");
  }

  camp.interestedCount += 1;
  await camp.save();

  res.status(200).json(serializeCamp(camp));
});

module.exports = {
  getCamps,
  createCamp,
  updateCamp,
  deleteCamp,
  markInterest
};
