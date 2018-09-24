<?php

function navActive($name)
{
     $slugs = explode("/", request()->getUri());
     $lastSlug = $slugs [(count ($slugs) - 1)];
     $lastSlug = explode("?",$lastSlug)[0];
     return $lastSlug == $name ? "active" : '';
}

function topNavActive($name)
{
    $uri = request()->getUri();

    return str_contains($uri, $name) ? "active" : '';
}

function formatBigNums($input){
    $input = number_format($input, 1);
    $input_count = substr_count($input, ',');
    if($input_count != '0'){
        if($input_count == '1'){
            return substr($input, 0, -4).'k';
        } else if($input_count == '2'){
            return substr($input, 0, -8).'mil';
        } else if($input_count == '3'){
            return substr($input, 0,  -12).'bil';
        } else {
            return;
        }
    } else {
        return str_replace(".0", "", (string) $input);
    }
}

/**
 * @param $url
 * @param $payload
 * @return array
 */
function multiRequest($url, $payload, $params = [])
{
    //create the multiple cURL handle
    $requests = [];
    $response = [];

    $urlParts = parse_url($url);

    if (!empty($payload)) {

        $mh = curl_multi_init();

        foreach ($payload as $item) {

            $curl = curl_init();

            $post = ['item' => serialize($item), 'params' => serialize($params)];

            $post = http_build_query($post);

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POST, TRUE);
            curl_setopt($curl, CURLOPT_BINARYTRANSFER, TRUE);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);

            //NetworkError transfer closed with data remaining - FIX
            //curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($post)));

            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HEADER, 0);

            if ($urlParts["scheme"] == "https") {
                curl_setopt($curl, CURLOPT_CAINFO, base_path() . '/uniclix_bundle.crt');
                curl_setopt($curl, CURLOPT_CAPATH, base_path() . '/uniclix_bundle.crt');
            }

            $requests[] = $curl;
            curl_multi_add_handle($mh, $curl);

        }

        $running = null;

        do {
            $status = curl_multi_exec($mh, $running);
        } while ($status === CURLM_CALL_MULTI_PERFORM); // || $running

        //Handle CPU drainage
        while ($running && $status == CURLM_OK) {
            if (curl_multi_select($mh) == -1) {
                usleep(1); //Delay between requests for 1 microsecond to calm CPU down
            }

            do {
                $status = curl_multi_exec($mh, $running);
            } while ($status == CURLM_CALL_MULTI_PERFORM);
        }

        foreach ($requests as $identifier => $request) {
            $response[$identifier] = curl_multi_getcontent($request);
            curl_multi_remove_handle($mh, $request);
            curl_close($request);
        }

    }
     dd($response);
    return $response;
}

?>