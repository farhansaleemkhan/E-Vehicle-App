import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import { allCompaniesColumns } from "../../constants/data/companies";
import { companyService } from "../../services/company/companyService";

export default function ComapniesScreen() {
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const fetchAllCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllCompanies(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="All Companies:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allCompaniesColumns} tableBody={allCompanies} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
