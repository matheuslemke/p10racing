create view ranking as
select u.name, (sum(b.points)) as points
from bids b
inner join users u on b.user = u.id
group by u.name
order by points desc;
