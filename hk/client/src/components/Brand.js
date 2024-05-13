import React from 'react'
import Brand1 from '../img/brand/1.png';
import Brand2 from '../img/brand/2.png';
import Brand3 from '../img/brand/3.png';
import Brand4 from '../img/brand/4.png';
import Brand5 from '../img/brand/5.png';

const Brand = () => {
  return (
    <div>
      <section className="brand-area section_gap">
        <div className="container">
          <div className="row">
            <a className="col single-img" href="#">
              <img className="img-fluid d-block mx-auto" src={Brand1} alt />
            </a>
            <a className="col single-img" href="#">
              <img className="img-fluid d-block mx-auto" src={Brand2} alt />
            </a>
            <a className="col single-img" href="#">
              <img className="img-fluid d-block mx-auto" src={Brand3} alt />
            </a>
            <a className="col single-img" href="#">
              <img className="img-fluid d-block mx-auto" src={Brand4} alt />
            </a>
            <a className="col single-img" href="#">
              <img className="img-fluid d-block mx-auto" src={Brand5} alt />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Brand
