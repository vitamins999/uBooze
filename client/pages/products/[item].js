import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const fetchDrinkInfo = async (key, item) => {
  const res = await fetch(
    `http://localhost:3001/api/products/details?item=${item}`
  );
  return res.json();
};

const ItemPage = () => {
  const router = useRouter();
  const { item, postcode } = router.query;

  const { data, status } = useQuery(['drinkInfo', item], fetchDrinkInfo);

  if (status == 'loading')
    return (
      <Layout title='Loading...'>
        <div>Loading data...</div>
      </Layout>
    );

  if (status == 'error')
    return (
      <Layout title='Error'>
        <div>Error fetching data.</div>
      </Layout>
    );

  const title = `${data.productName} ${data.volume}`;

  return (
    <Layout title={title}>
      <div>
        <h1>Does this work?</h1>
        <h2>ProductID -- {item}</h2>
        <h2>Postcode -- {postcode}</h2>

        <h3>Item Name -- {data.productName}</h3>
      </div>
    </Layout>
  );
};

export default ItemPage;
