import React, { Fragment, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../../actions/cart";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cookies, , removeCookies] = useCookies();
  const [, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const user = cookies.user;

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const cart = useSelector((state) => state.cart);
  const totalItems = cart ? cart?.length : 0;

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user._id, user.token));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    removeCookies("user");
    navigate("/");
  };

  useEffect(() => {
    switch (currentPage) {
      case "cart":
        setShowSearchButton(true);
        break;
      case "categories":
        setShowSearchButton(true);
        break;
      case "products":
        setShowSearchButton(true);
        break;
      case "shop":
        setShowSearchButton(true);
        break;
      case "subCategories":
        setShowSearchButton(true);
        break;
      case "transactions":
        setShowSearchButton(true);
        break;
      case "users":
        setShowSearchButton(true);
        break;
      case "orders":
        setShowSearchButton(true);
        break;
      default:
        setShowSearchButton(false);
    }
    if (search === false) {
      setSearchParam({});
      setSearchText("");
    }
  }, [currentPage, search, setSearchParam, searchText]);
  const handleSearch = (e) => {
    e.preventDefault();
    switch (currentPage) {
      case "cart":
        setSearchParam({ page: "cart", search: searchText });
        break;
      case "categories":
        setSearchParam({ page: "categories", search: searchText });
        break;
      case "products":
        setSearchParam({ page: "products", search: searchText });
        break;
      case "shop":
        setSearchParam({ page: "shop", search: searchText });
        break;
      case "subCategories":
        setSearchParam({ page: "subCategories", search: searchText });
        break;
      case "transactions":
        setSearchParam({ page: "transactions", search: searchText });
        break;
      case "orders":
        setSearchParam({ page: "orders", search: searchText });
        break;
      case "users":
        setSearchParam({ page: "users", search: searchText });
        break;
      default:
        setShowSearchButton(false);
    }
  };

  return (
    <div className="site-navbar bg-white py-2">
      {search && (
        <div className="container">
          <div className="row">
            <button
              className="search-close js-search-close btn btn-small btn-default mr-1"
              onClick={() => setSearch(false)}
            >
              <span className="icon-close2"></span>
            </button>
            <form
              style={{
                width: "85%",
              }}
              onSubmit={handleSearch}
            >
              <input
                type="search"
                className="form-control form-control-lg"
                placeholder={`Search ${currentPage} ${
                  currentPage === "users" ? "using email or full name" : ""
                } ${
                  currentPage === "transactions" ? "using reference code" : ""
                } and hit enter...`}
                style={{ width: "100%", border: "0px" }}
                name="searchText"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}

      {!search && (
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="">
                <Link to="/" className="js-logo-clone logo" alt="breem">
                  {/* bremolah */}
                  <img src="images/site-logo.png" className="logo-img" alt="logggooos"/>
                </Link>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav
                className="site-navigation text-right text-md-center"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  {user === undefined && (
                    <Fragment>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup">Sign up</Link>
                      </li>
                    </Fragment>
                  )}

                  {user !== undefined && (
                    <Fragment>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li className="has-children">
                        <p>Menu</p>
                        <ul className="dropdown">
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/transactions">Transactions</Link>
                          </li>

                          {user.isAdmin && (
                            <Fragment>
                              <li>
                                <Link to="/users">Users</Link>
                              </li>
                              <li>
                                <Link to="/add-item">Add Product</Link>
                              </li>
                              <li>
                                <Link to="/orders">Orders</Link>
                              </li>
                              <li>
                                <Link to="/items">Products</Link>
                              </li>
                              <li>
                                <Link to="/add-category">Add Category</Link>
                              </li>
                              <li>
                                <Link to="/categories">Categories</Link>
                              </li>
                              <li>
                                <Link to="/add-sub-category">
                                  Add Sub Category
                                </Link>
                              </li>
                              <li>
                                <Link to="/sub-categories">Sub Categories</Link>
                              </li>
                            </Fragment>
                          )}
                        </ul>
                      </li>
                      <li>
                        <button
                          className="btn btn-sm btn-danger d-large"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>
            <div className="icons">
              {showSearchButton && (
                <button
                  className="icons-btn d-inline-block js-search-open btn btn-sm btn-default"
                  onClick={() => setSearch(true)}
                >
                  <span className="icon-search"></span>
                </button>
              )}
              {user && (
                <Link to="/cart" className="icons-btn d-inline-block bag">
                  <span className="icon-shopping-bag"></span>
                  <span className="number">{totalItems}</span>
                </Link>
              )}
              <a
                href="/"
                className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
              >
                <span className="icon-menu"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
