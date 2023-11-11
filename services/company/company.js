const { Company } = require("../../models/company/company");

async function getAllCompanies(filter) {
  try {
    const companies = await Company.find(filter).populate("userId", "-password");
    return companies;
  } catch (error) {}
}

exports.companyService = {
  getAllCompanies,
};
