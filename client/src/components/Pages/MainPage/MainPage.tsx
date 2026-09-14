
import { useEffect, useState } from "react"
import type { item } from "../AddItem/AddItem"
import Item from "../../Item/Item";
import classes from './MainPage.module.scss'
import IsLogined from "../../IsLogined";
import AddCategory from "../../AddCategory/AddCategory";

interface Filter {
  minPrice?: number,
  maxPrice?: number,
  sort?: number
}

export default function MainPage() {
  const [currentPage, setPage] = useState<number>(1);
  const [searchValue, setValue] = useState<string>();
  const [categories, setCat] = useState<string[]>([]);
  const [items, setItem] = useState<item[]>([]);
  const [filter, setFilter] = useState<Filter>({
    minPrice: 0,
    maxPrice: 999999999,
    sort: 1
  });

  const [filtersWindow, setWindow] = useState<boolean>(false);

  async function Search(reset?:boolean) {
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        value: searchValue,
        filter: filter,
        categories: categories,
        page: currentPage
      }),
      credentials: 'include'
    });

    const result = await response.json();
    console.log(result);
    if(reset)setItem(result);
    else setItem(prev => [...prev, ...result]);
  }

  useEffect(() => {
    let type:boolean = false;
    if(currentPage==1) type=true;
    Search(type);
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener('scroll', HandleScroll);

    return () => {
      document.removeEventListener('scroll', HandleScroll);
    };
  }, []);

  function HandleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200
    ) {
      setPage(prev => prev + 1);
    }
  }

  return (
    <main className={classes.main}>
      <IsLogined />

     
      <div className={classes.div}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
  className={classes.button}
  onClick={() => {
    setItem([]);
    if (currentPage === 1) {
      Search(true);
    } else {
      setPage(1);
    }
  }}
>
  Search
</button>
      </div>
 {filtersWindow && (
        <section className={classes.section}>
          <input
            type="number"
            placeholder="min price"
            onChange={(e) =>
              setFilter({
                ...filter,
                minPrice: Number(e.target.value)
              })
            }
            value={filter?.minPrice}
          />

          <input
            type="number"
            placeholder="max price"
            onChange={(e) =>
              setFilter({
                ...filter,
                maxPrice: Number(e.target.value)
              })
            }
            value={filter?.maxPrice}
          />

          <select
            value={filter?.sort}
            onChange={(e) =>
              setFilter({
                ...filter,
                sort: Number(e.target.value)
              })
            }
          >
            <option value={1}>Sort A-Z</option>
            <option value={-1}>Sort Z-A</option>
          </select>

          <AddCategory setCategories={setCat} />

          <button className={classes.buttonFilter} onClick={() => setWindow(false)}>
            Close
          </button>
        </section>
      )}
      <div className={classes.lastDiv}>
      {!filtersWindow && (
        <button className ={classes.buttonFilter}onClick={() => {setWindow(true)}}>
          Filters
        </button>
      )}
      </div>
      <section>
        {items?.map((item) => {
          return <Item data={item} />
        })}
      </section>
    </main>
  );
}

