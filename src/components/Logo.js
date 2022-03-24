export function Logo({ className }) {
  return (
    <div className="flex items-center">
      <svg className={`${className} w-10 h-10 mr-2`} viewBox="0 0 1024 1024">
        <path
          d="M95.39467953 411.89492448c19.68238619 99.94065645 63.82443475 178.09692615 137.39451677 234.65989918 42.61331986 32.86767262 62.86897951 63.82443475 40.3202276 115.99231175-5.9238247 13.5674698-11.08328586 30.76567045 11.84764944 55.79860789 69.93935115-94.7811969 172.74637488-61.72243259 268.483027-67.6462573 62.67788783-3.82182254 120.96068124-26.37057446 174.46619529-63.44225298 0.95545524 112.93485436-78.3473598 214.5953312-196.25058364 255.10664893-149.43325785 51.78569366-325.61927353 1.91091049-419.44501359-118.47649572-96.88319905-124.5914121-105.29120927-278.22867428-16.81601887-411.99246175z"
          fill="#34B05F"
        ></path>
        <path
          d="M257.05776859 560.1816354c-73.18790021-104.71793583-107.0110281-201.98331665-60.57588567-312.6250756 53.69660572-127.64886951 156.31253779-191.28221418 290.84068883-198.73476915 135.1014245-7.64364508 236.95299301 52.93224058 321.98854265 183.44747898-137.58560846-49.6836915-250.90264459-29.61912354-356.95821743 34.01421953-106.05557283 63.25116129-167.39582366 159.36999679-195.29512838 293.89814624z"
          fill="#34B05F"
        ></path>
        <path
          d="M742.04703888 913.89130375c142.74506802-280.7128598 88.09300706-466.26233937-170.64437274-605.56776817 91.15046602-47.00841588 216.5062417-28.6636683 303.26161171 44.71532361 95.73665214 80.83154531 132.99942076 214.21314942 91.34155612 340.14219853-35.73403993 107.77539323-102.80702377 185.74057123-223.95879509 220.71024603z"
          fill="#34B05F"
        ></path>
      </svg>

      <span className="text-2xl ml-1">Wechat</span>
      <span className="text-2xl ml-1">Editor</span>
    </div>
  )
}
