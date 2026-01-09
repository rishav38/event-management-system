const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h4 className="sidebar-title">Planning Tools</h4>

      <nav className="sidebar-nav">
        <a href="#">Overview</a>
        <a href="#">Guest List</a>
        <a href="#" className="active">Budget</a>
        <a href="#">Itinerary</a>
        <a href="#">Notes</a>
      </nav>
    </aside>
  );
};


export default Sidebar;
