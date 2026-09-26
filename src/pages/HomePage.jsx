import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import ThreadList from '../components/ThreadList';
import CategoryList from '../components/CategoryList';
import ThreadInput from '../components/ThreadInput';
import {
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';

// Integrasi styled-components untuk memenuhi kriteria React Ecosystem
const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color:  #52796f;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  z-index: 100;

  &:hover {
    background-color: #354f52;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onSelectCategory = (category) => {
    setSelectedCategory((prev) => (prev === category ? '' : category));
  };

  const onAddThread = async ({ title, body, category }) => {
    const success = await dispatch(asyncAddThread({ title, body, category }));
    if (success) {
      setIsModalOpen(false);
    }
  };

  const onUpVote = (threadId) => {
    dispatch(asyncToggleVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean))
  );

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <section className="home-page">
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="home-page__header">
        <h2>Diskusi Tersedia</h2>
      </div>

      <ThreadList
        threads={filteredThreads}
        users={users}
        authUser={authUser}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />

      {authUser && (
        <FloatingAddButton
          type="button"
          className="btn-floating-add"
          title="Tambah Thread"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
        </FloatingAddButton>
      )}

      {isModalOpen && (
        <ThreadInput
          onAddThread={onAddThread}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}

export default HomePage;