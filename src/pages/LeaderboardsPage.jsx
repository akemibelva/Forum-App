import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboards-list">
        <header className="leaderboards-list__header">
          <span>Pengguna</span>
          <span>Skor</span>
        </header>

        {leaderboards.map((item) => (
          <div key={item.user.id} className="leaderboard-item">
            <div className="leaderboard-item__user">
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="leaderboard-item__avatar"
              />
              <span className="leaderboard-item__name">{item.user.name}</span>
            </div>
            <span className="leaderboard-item__score">{item.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeaderboardsPage;