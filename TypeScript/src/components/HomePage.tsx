import { useState } from 'react';
import UseFetch from './customHooks/UseFetch';
import TableContent from './TableContent/TableContent';
import { mainType } from './types/Types';

type languages = {
  name: string;
}

const createData = (flag: string, name: string, population: number, languages: languages[], region: string) => {
  return { flag, name, population, languages, region };
};
const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, loading, error } = UseFetch("https://restcountries.com/v2/all");

  const rows = (data.map((res) => (
    createData((res.flag), (res.name), (res.population), (res.languages.map(res => (res))), (res.region))
  )))
  const loadingMessage = <p>loading... </p>;
  const errorMessage = <p>{error}</p>;

  const search = (rows: mainType[]) => {
    return rows.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }
  return (
    <>
      <div>
        <input type="text" placeholder="Search something...." onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
      </div>
      {loading ? (loadingMessage) : (
        <div>
          {error && errorMessage}
          <TableContent data={search(rows)} />
        </div>
      )}
    </>
  )
}

export default HomePage;