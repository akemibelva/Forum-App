import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import ThreadList from '../components/ThreadList';
import CategoryList from '../components/CategoryList';
import ThreadInput from '../components/ThreadInput';
import {
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';

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
        <button
          type="button"
          className="btn-floating-add"
          title="Tambah Thread"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
        </button>
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