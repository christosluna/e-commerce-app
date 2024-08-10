"use client";
import { useCallback, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SearchBox from "@/app/components/SearchBox";
import ProductCard from "@/app/components/ProductCard";
import { Product, SortOption } from "@/app/interface";

export default function Home() {
  const cartItemCount = 3;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('title');
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setDisplayedProducts([]);
    setHasMore(true);
  };

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const bottom = event.currentTarget.scrollHeight === event.currentTarget.scrollTop + event.currentTarget.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore, loading]);

  const fetchProducts = useCallback(async (page: number) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 400));

      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const productsPerPage = 10;
      const startIndex = (page - 1) * productsPerPage;
      const newProducts = data.slice(startIndex, startIndex + productsPerPage);

      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      }

      setAllProducts(data);
      setProducts(prevProducts => {
        const uniqueProducts = new Map([...prevProducts, ...newProducts].map(product => [product.id, product]));
        return Array.from(uniqueProducts.values());
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (hasMore || !searchQuery) {
      fetchProducts(page);
    }
  }, [page, hasMore, searchQuery]);

  useEffect(() => {
    const filterAndSortProducts = () => {
      let filteredProducts = products;

      // Filter by search query
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filteredProducts = allProducts.filter(product =>
          product.title.includes(searchQuery)
        );
      }

      // Sort products
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
          case 'price':
            return a.price - b.price;
          case 'rating':
            return b.rating - a.rating;
          case 'title':
          default:
            return a.id;
        }
      });

      setDisplayedProducts(sortedProducts);
    };

    filterAndSortProducts();
  }, [searchQuery, sortOption, products]);

  return (
    <div className="relative p-5">
      <Header cartItemCount={cartItemCount} />

      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-4">
          <div className="flex justify-center flex-grow sm:justify-start sm:ml-4">
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <label htmlFor="sort" className="text-gray-600">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border border-gray-300 pl-2 rounded-md py-2 px-4"
            >
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="space-y-4 p-5 sm:p-10 border-2 border-gray-300 rounded-md max-h-[calc(100vh-16rem)] overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
        {displayedProducts.length === 0 && !loading && (
          <p className="text-center text-gray-500">No products found</p>
        )}
        {loading && (
          <div className="text-center text-gray-500">Loading more products...</div>
        )}
      </div>
    </div>
  );
}
