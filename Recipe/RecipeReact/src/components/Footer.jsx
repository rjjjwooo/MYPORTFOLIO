import React from 'react';
function Footer(props){
    return (
        <footer>
            <div className="introduction">
                <h2>{props.title}</h2>
                <div className="member_area">
                    <div className="member_box">
                        <div className="name">홍인영</div>
                        <a className="phone" href="tel:+821051925705"><strong>Phone</strong>010-5192-5705</a>
                        <a  href='http://kkms4001.iptime.org/~c20st22/portfolio/' target="_blank" rel="noopener noreferrer" className="link"><strong>Portfolio</strong>http://kkms4001.iptime.org/~c20st22/portfolio/</a>
                    </div>
                    <div className="member_box">
                        <div className="name">서현지</div>
                        <a className="phone" href="tel:+821035556302"><strong>Phone</strong>010-3555-6302</a>
                        <a  href='http://kkms4001.iptime.org/~c20st14/portfolio/' target="_blank" rel="noopener noreferrer" className="link"><strong>Portfolio</strong>http://kkms4001.iptime.org/~c20st14/portfolio/</a>
                    </div>
                    <div className="member_box">
                        <div className="name">김건우</div>
                        <a className="phone" href="tel:+821082310603"><strong>Phone</strong>010-8231-0603</a>
                        <a href='http://kkms4001.iptime.org/~c20st03/portfolio/' target="_blank" rel="noopener noreferrer" className="link"><strong>Portfolio</strong>http://kkms4001.iptime.org/~c20st03/portfolio/</a>
                    </div>
                </div>
            </div>
            <p><i className='xi-library-books-o'></i>이 사이트는 개인 포트폴리오 용도로만 사용되며 상업적 목적이 없습니다.</p>
        </footer>
    )
}
export default Footer;