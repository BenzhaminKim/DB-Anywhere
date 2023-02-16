import DatabasesList from './DatabasesList';
import CreateDatabase from './CreateDatabase';

const Databases = () => (
	<div>
		<div>
			<h3>Databases:</h3>
			<CreateDatabase />
		</div>
		<DatabasesList />
	</div>
);

export default Databases;
