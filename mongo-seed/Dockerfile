FROM mongo

COPY data.json /data.json
CMD mongoimport --host mongodb --db counties --collection counties --type json --file /data.json --jsonArray