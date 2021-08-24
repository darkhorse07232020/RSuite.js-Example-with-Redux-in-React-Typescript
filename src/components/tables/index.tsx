import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SelectPicker, Table } from 'rsuite';
import TablePagination from 'rsuite/lib/Table/TablePagination';
import { STATUSES } from 'constants/redux';
import { getUniversityData } from 'store/universityData';
import { universityActionState, selectUniversity } from 'store/universityData/selector';
import CountryList from 'assets/json/countries.json';

const Tables: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const universityList = useSelector(selectUniversity);
  const isLoading = useSelector(universityActionState) === STATUSES.PENDING;
  const dispatch = useDispatch();
  const [displayLength, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [countryName, setCountryName] = useState(CountryList[0].label);
  const [universityName, setUniversityName] = useState('');

  const handleChangeLength = (dataKey: number) => {
    setPage(1);
    setLength(dataKey);
  };

  const getData = () =>
    dispatch(
      getUniversityData({
        country: countryName,
        name: universityName,
      })
    );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableData = useMemo(
    () =>
      universityList.filter((_item, index) => {
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return index >= start && index < end;
      }),
    [displayLength, page, universityList]
  );
  return (
    <div style={{ marginTop: 50 }}>
      <div style={{ margin: 20, display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: 30 }}>
          <label style={{ marginRight: 10 }}>Select Country:</label>
          <SelectPicker
            data={CountryList}
            style={{ width: 224 }}
            onChange={setCountryName}
            defaultValue={countryName}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}>
          <label style={{ marginRight: 10 }}>Name:</label>
          <Input placeholder="Enter name" onChange={setUniversityName} />
        </div>
        <Button appearance="primary" onClick={() => getData()}>
          Search
        </Button>
      </div>
      <Table virtualized height={400} data={tableData} loading={isLoading}>
        <Column flexGrow={1}>
          <HeaderCell>Country</HeaderCell>
          <Cell dataKey="country" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Website</HeaderCell>
          <Cell dataKey="web_pages" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Domain</HeaderCell>
          <Cell dataKey="domains" />
        </Column>
      </Table>

      <TablePagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={page}
        displayLength={displayLength}
        total={universityList.length}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

export default Tables;
