import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

// Integrasi styled-components untuk memenuhi kriteria React Ecosystem
const LeaderboardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-top: 1rem;
`;

const LeaderboardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

const UserScore = styled.span`
  font-weight: 700;
  color:  #52796f;
  font-size: 1.1rem;
`;

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <LeaderboardContainer className="leaderboards-list">
        <header className="leaderboards-list__header">
          <span>Pengguna</span>
          <span>Skor</span>
        </header>

        {leaderboards.map((item) => (
          <LeaderboardRow key={item.user.id} className="leaderboard-item">
            <div className="leaderboard-item__user">
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="leaderboard-item__avatar"
              />
              <span className="leaderboard-item__name">{item.user.name}</span>
            </div>
            <UserScore className="leaderboard-item__score">{item.score}</UserScore>
          </LeaderboardRow>
        ))}
      </LeaderboardContainer>
    </section>
  );
}

export default LeaderboardsPage;