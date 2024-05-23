import React, { useRef,useLayoutEffect } from 'react';
import './home.css';
import ProductCard from './productcard';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Home = (props) => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const comp=useRef(null)
  useLayoutEffect(()=>{
    let ctx=gsap.context(()=> {
      const t1=gsap.timeline();
      t1.from(["#animation-2","#animation-3"],{
        opacity:0,
        y:"+=30",
        stagger:0.5,
      });
    },comp);
  return ()=> ctx.revert()
  },[])

  return (
    <div ref={comp}>
      <div className="home" id="animation-1">
        <h1 id="animation-2">CAMPUS EBAY</h1>
        <div className="button" id="animation-3">
          <button onClick={handleClick}>EXPLORE</button>
        </div>
      </div>
      <div className="marketplace" ref={ref}>
        <div className="marketplace-content">
          <h1>Coolers</h1>
          <div className="Coolers">
            {props.data?.Coolers?.map((item, index) => (
              <Link to={`/product/coolers/${index}`} key={index} style={{ textDecoration: 'none' }}>
                <ProductCard
                  image={item.image[0]}
                  price={item.price}
                  name={item.name}
                />
              </Link>
            ))}
          </div>
          <h1 style={{ marginTop: '2rem' }}>Mattresses</h1>
          <div className="Mattresses">
            {props.data?.Mattresses?.map((item, index) => (
              <Link to={`/product/mattresses/${index}`} key={index} style={{ textDecoration: 'none' }}>
                <ProductCard
                  image={item.image[0]}
                  price={item.price}
                  name={item.name}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
