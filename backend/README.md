# Fuck the h4k0bu5 v2 server

## Usage
```
pip install -r requirements.txt
python main.py
```

GET `{HOST}/result/亀田支所前/はこだて未来大学`
```
{
  "routes": [
    {
      "duration": "所要時間： 8 分",
      "estimated_time_arrival": "予定時刻 15:34",
      "estimated_time_departure": "予定時刻 15:26",
      "line": "１０５系統（未来大経由）",
      "line_description", "亀田支所前・五稜郭・松風町経由, 函館駅前行き",
      "predicted_time_arrival", "発車予測 15:26",
      "predicted_time_departure", "到着予測 15:34"
    },
    {
      "duration": "所要時間： 8 分",
      "estimated_time_arrival": "予定時刻 16:16",
      "estimated_time_departure": "予定時刻 16:08",
      "line": "５５系統",
      "line_description": "亀田支所前・五稜郭経由, 函館税務署入口行き",
      "predicted_time_arrival": "発車予測 16:08",
      "predicted_time_departure": "到着予測 16:16"
    }
  ]
}
```
